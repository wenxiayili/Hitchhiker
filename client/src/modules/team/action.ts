import { takeEvery, put } from 'redux-saga/effects';
import { syncAction } from '../../action';
import { SyncType } from '../../utils/request_manager';
import { HttpMethod } from '../../common/http_method';

export const QuitTeamType = 'quit_team_type';
export const DisbandTeamType = 'disband_team_type';
export const SaveTeamType = 'save_team_type';
export const ActiveTeamType = 'active_team_type';
export const RemoveUserType = 'remove_user_type';
export const InviteMemberType = 'invite_member_type';
export const SaveEnvironmentType = 'save_env_type';
export const DelEnvironmentType = 'del_env_type';
export const EditEnvCompletedType = 'edit_env_completed_type';

export function* quitTeam() {
    yield takeEvery(QuitTeamType, pushQuitTeamToChannel);
}

export function* disbandTeam() {
    yield takeEvery(DisbandTeamType, pushDisbandTeamToChannel);
}

export function* saveTeam() {
    yield takeEvery(SaveTeamType, pushSaveTeamToChannel);
}

export function* removeUser() {
    yield takeEvery(RemoveUserType, pushRemoveUserToChannel);
}

export function* inviteMember() {
    yield takeEvery(InviteMemberType, pushInviteMemberToChannel);
}

export function* saveEnvironment() {
    yield takeEvery(SaveEnvironmentType, pushSaveEnvToChannel);
}

export function* delEnvironment() {
    yield takeEvery(DelEnvironmentType, pushDelEnvToChannel);
}

function* pushQuitTeamToChannel(action: any) {
    const channelAction = syncAction({ type: SyncType.quitTeam, method: HttpMethod.DELETE, url: `http://localhost:3000/api/team/${action.value.id}/own` });
    yield put(channelAction);
}

function* pushDisbandTeamToChannel(action: any) {
    const channelAction = syncAction({ type: SyncType.disbandTeam, method: HttpMethod.DELETE, url: `http://localhost:3000/api/team/${action.value.id}` });
    yield put(channelAction);
}

function* pushRemoveUserToChannel(action: any) {
    const channelAction = syncAction({ type: SyncType.disbandTeam, method: HttpMethod.DELETE, url: `http://localhost:3000/api/team/${action.value.teamId}/user/${action.value.userId}` });
    yield put(channelAction);
}

function* pushSaveTeamToChannel(action: any) {
    const method = action.value.isNew ? HttpMethod.POST : HttpMethod.PUT;
    const channelAction = syncAction({ type: SyncType.saveTeam, method, url: `http://localhost:3000/api/team`, body: action.value.team });
    yield put(channelAction);
}

function* pushInviteMemberToChannel(action: any) {
    const channelAction = syncAction({ type: SyncType.inviteMember, method: HttpMethod.POST, url: `http://localhost:3000/api/team/${action.value.teamId}`, body: { emails: action.value.emails } });
    yield put(channelAction);
}

function* pushSaveEnvToChannel(action: any) {
    const method = action.value.isNew ? HttpMethod.POST : HttpMethod.PUT;
    const channelAction = syncAction({ type: SyncType.saveEnvironment, method: method, url: `http://localhost:3000/api/environment`, body: action.value.env });
    yield put(channelAction);
}

function* pushDelEnvToChannel(action: any) {
    const channelAction = syncAction({ type: SyncType.delEnvironment, method: HttpMethod.DELETE, url: `http://localhost:3000/api/environment/${action.value.envId}` });
    yield put(channelAction);
}