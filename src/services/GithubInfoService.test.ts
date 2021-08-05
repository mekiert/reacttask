import GithubInfoService, {RepoInfo, UserDetails} from "./GithubInfoService";

describe("GithubInfoService", () => {
    afterEach(() => {
        fetch.mockClear();
    })

    it('should return 4 best repos from method getUserBestRepos', async () => {
        const allRepos: RepoInfo[] = [
            {name: 'repo0', html_url: '', stargazers_count: 68},
            {name: 'repo1', html_url: '', stargazers_count: 2},
            {name: 'repo2', html_url: '', stargazers_count: 100},
            {name: 'repo3', html_url: '', stargazers_count: 1},
            {name: 'repo4', html_url: '', stargazers_count: 25},
            {name: 'repo5', html_url: '', stargazers_count: 7},
            {name: 'repo6', html_url: '', stargazers_count: 42},
            {name: 'repo7', html_url: '', stargazers_count: 4},
        ];

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(allRepos),
            })
        );

        const bestRepos = await GithubInfoService.getUserBestRepos("abc");
        expect(bestRepos.length).toBe(4);
        expect(bestRepos[0].name).toBe('repo2');
        expect(bestRepos[1].name).toBe('repo0');
        expect(bestRepos[2].name).toBe('repo6');
        expect(bestRepos[3].name).toBe('repo4');
    });

    it('should call fetch only 1 time for many requests to getUserDetails with the same username', async () => {
        const userDetails: UserDetails = {
            login: "test_user",
            avatar_url: "",
            bio: null,
            name: null
        };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(userDetails),
            })
        );

        const firstResponse = await GithubInfoService.getUserDetails("test_user");
        const secondResponse = await GithubInfoService.getUserDetails("test_user");
        const thirdResponse = await GithubInfoService.getUserDetails("test_user");

        expect(fetch).toBeCalledTimes(1);
        expect(firstResponse).toBe(secondResponse);
        expect(secondResponse).toBe(thirdResponse);
    })
})
