export type UserSearchResult = {
    login: string
}

export type UsersSearchResult = {
    items: UserSearchResult[],
    total_count: number
}

export type UserDetails = {
    login: string,
    avatar_url: string | null,
    bio: string | null,
    name: string | null
}

export type RepoInfo = {
    name: string,
    html_url: string,
    stargazers_count: number
}

export default class GithubInfoService {
    static readonly MAX_CACHE_SIZE = 40;
    static readonly MAX_BEST_REPOS = 4;
    static readonly MAX_USERS_PRO_LIST = 6;
    static readonly API_BASE_URL = "https://api.github.com";
    static readonly reposDescendingComparator = (elem1: RepoInfo, elem2: RepoInfo): number =>
        elem2.stargazers_count - elem1.stargazers_count;

    private static readonly userDetailsCache = new Map<string, UserDetails>();

    static findUsersByUsernameSearch(usernameSearch: string): Promise<UsersSearchResult> {
        const urlUsername = encodeURIComponent(usernameSearch);
        const urlLimitUsers = "&per_page=" + GithubInfoService.MAX_USERS_PRO_LIST;
        return fetch(GithubInfoService.API_BASE_URL + "/search/users?q=" + urlUsername + urlLimitUsers)
            .then(response => response.json());
    }

    static getUserDetails(username: string): Promise<UserDetails> {
        const cached = GithubInfoService.userDetailsCache.get(username);
        if(cached) {
            return Promise.resolve(cached);
        }

        return fetch(GithubInfoService.API_BASE_URL + "/users/" + encodeURIComponent(username))
            .then(response => response.json())
            .then(userDetails => {
                if(GithubInfoService.userDetailsCache.size < GithubInfoService.MAX_CACHE_SIZE) {
                    GithubInfoService.userDetailsCache.set(username, userDetails);
                }
                return userDetails;
            });
    }

    static getUserBestRepos(username: string): Promise<RepoInfo[]> {
        const urlUsername = encodeURIComponent(username)
        return fetch(GithubInfoService.API_BASE_URL + "/users/" + urlUsername + "/repos")
            .then(response => response.json())
            .then((allRepos: RepoInfo[]) => allRepos
                .sort(GithubInfoService.reposDescendingComparator)
                .slice(0, GithubInfoService.MAX_BEST_REPOS)
            );
    }
}