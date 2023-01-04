import { GITHUB_PROFILE_BASE_PATH } from "../constants/index";

export const getProfileUrl = (searchText) => {
    return `${GITHUB_PROFILE_BASE_PATH}${searchText}`;
}

export const getStarredRepoUrl = (searchText) => {
    return `${GITHUB_PROFILE_BASE_PATH}${searchText}/starred`;
}

export const getPublicRepoUrl = (searchText) => {
    return `${GITHUB_PROFILE_BASE_PATH}${searchText}/repos`;
}
