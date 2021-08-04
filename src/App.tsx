import React, {ReactElement} from 'react';
import GithubUserSearchBar from "./components/github-user-search-bar/GithubUserSearchBar";

export default function App(): ReactElement {
  return (
    <div>
      <GithubUserSearchBar onSearch={(userName => console.log(userName))}/>
    </div>
  );
}
