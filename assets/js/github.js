(async () => {
const restConfig = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "token a2626cd7f6bfeaf960f11fb390d3f1ddd279c377"
    }
};
const userReq = await fetch('https://api.github.com/users/0xaryan', restConfig);
const repoReq = await fetch('https://api.github.com/users/0xaryan/repos?per_page=100', restConfig);
const userResp = await userReq.json();
const repoResp = await repoReq.json();

const ghProfileImage     = document.getElementById("gh-profile-image"),
      ghProfileName      = document.getElementById("gh-profile-name"),
      ghProfileBio       = document.getElementById("gh-profile-bio"),
      ghProfileRepos     = document.getElementById("gh-profile-repos"),
      ghProfileGists     = document.getElementById("gh-profile-gists"),
      ghProfileFollowers = document.getElementById("gh-profile-followers"),
	  ghRepoContainer    = document.getElementById("gh-repo-container"),
	  loadingRow         = document.getElementById("gh-loading-row");

ghProfileImage.src = userResp.avatar_url;
ghProfileName.innerText = userResp.name;
ghProfileBio.innerText = userResp.bio;
ghProfileFollowers.innerText = userResp.followers;
ghProfileRepos.innerText = userResp.public_repos;
ghProfileGists.innerText = userResp.public_gists;

const createAuthorNode = isMe => {
    const $authorNode = document.createElement("span");
    $authorNode.className = "tag";
    if(isMe){ $authorNode.innerHTML = '<span class="tag-avatar avatar" style="background-image: url(./aryan_data/Aryan.jpg)"></span>Aryan'; }
    else    { $authorNode.innerHTML = '<span class="tag-avatar avatar""><i class="fa fa-code-fork"></i></span>Fork'; }
    return $authorNode;
}

const formatSize = size => (size < 1500) ? `${size} KB` : `${(size/1000.0).toFixed(1)} MB`;

const createLangNode = lang => {
    if(lang != null) {
        const $langTag = document.createElement("div");
        $langTag.classList.add("tag", "tag-info");
        $langTag.innerHTML = `${lang}<span class="tag-addon"><i class="fe fe-code"></i></span>`;
        return $langTag;
    }
    else return document.createElement("div");
};

const applyFormat = date => `${date.substr(0, 4)}`;

const createRow = response => {
	const r = response;
	const id = r.id,
	      repoName = r.name,
	      repoDesc = r.description || "(No description provided)",
	      repoUrl = r.html_url,
	      createdDate = r.created_at,
	      size = r.size,
	      stars = r.stargazers_count,
	      forks = r.forks,
	      issues = r.open_issues_count,
	      ownerUrl = r.owner.html_url,
	      license = r.license;

    const rowNode = document.createElement("tr");
    const rawLicense = (license || {name: "No License"} ).name;
    const iconTag = !license ? "x" : "check";

    rowNode.innerHTML = `
    <td>
        <div><span style="cursor: help" data-toggle="tooltip" title="${repoDesc}" data-original-title="${repoDesc}">${repoName}</span></div>
        <div class="small text-muted">
            Created: ${applyFormat(createdDate)}
        </div>
    </td>
    <td id="lang-${id}"></td>
    <td class="d-none d-md-table-cell text-nowrap text-center" id="status-${id}">
        <i class="fe fe-star"></i> ${stars}
        <i class="fa fa-code-fork"></i> ${forks}
        <i class="fe fe-alert-octagon"></i> ${issues}
    </td>
    <td id="author-node-${id}"></td>
    <td class="d-none d-md-table-cell text-nowrap text-center">${formatSize(size)}</td>
    <td class="text-center">
        <div class="item-action dropdown">
            <a href="javascript:void(0)" data-toggle="dropdown" class="icon"
                aria-expanded="false"><i class="fe fe-more-vertical"></i></a>
            <div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end"
                style="position: absolute; transform: translate3d(15px, 19px, 0px); top: 0px; left: 0px; will-change: transform;">
                <a href="${repoUrl}" class="dropdown-item"><i
                        class="dropdown-icon fe fe-github"></i> Visit repo </a>
                <a href="${ownerUrl}" class="dropdown-item"><i
                        class="dropdown-icon fe fe-user"></i> Visit Owner </a>
                <div class="dropdown-divider"></div>
                <a href="javascript:void(0)" class="dropdown-item disabled"><i
                        class="dropdown-icon fe fe-${iconTag}-circle"></i> ${rawLicense}</a>
            </div>
        </div>
    </td>
    `;

    return rowNode;
}

ghRepoContainer.removeChild(loadingRow)
repoResp.sort((x, y) => y.stargazers_count - x.stargazers_count);
repoResp.forEach(r => {

    const rowNode = createRow(r);

    ghRepoContainer.appendChild(rowNode);
    document.getElementById(`author-node-${r.id}`).appendChild(createAuthorNode(!r.fork));
    document.getElementById(`lang-${r.id}`).appendChild(createLangNode(r.language));
    if(r.archived || r.disabled){document.getElementById(`status-${r.id}`).innerHTML = '<div class="tag tag-purple">archived<span class="tag-addon"><i class="fe fe-book"></i></span></div>';
    }
});

})();
