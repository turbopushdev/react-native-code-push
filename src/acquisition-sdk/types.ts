interface AccessKeyBase {
  createdBy?: string;
  description?: string;
  friendlyName?: string;
  name?: string;
}

export interface ServerAccessKey extends AccessKeyBase {
  createdTime?: number;
  expires: number;
  isSession?: boolean;
}

export interface AccessKeyRequest extends AccessKeyBase {
  ttl?: number;
}

export interface DeploymentMetrics {
  [packageLabelOrAppVersion: string]: UpdateMetrics;
}

export interface DeploymentStatusReport {
  app_version: string;
  client_unique_id?: string;
  deployment_key: string;
  previous_deployment_key?: string;
  previous_label_or_app_version?: string;
  label?: string;
  status?: string;
}

export interface DownloadReport {
  client_unique_id: string;
  deployment_key: string;
  label: string;
}

export interface PackageInfo {
  appVersion?: string;
  description?: string;
  isDisabled?: boolean;
  isMandatory?: boolean;
  label?: string;
  packageHash?: string;
  rollout?: number;
}

export interface UpdateCheckResponse {
  download_url?: string;
  description?: string;
  is_available: boolean;
  is_disabled?: boolean;
  target_binary_range: string;
  label?: string;
  package_hash?: string;
  package_size?: number;
  should_run_binary_version?: boolean;
  update_app_version?: boolean;
  is_mandatory?: boolean;
}

export interface UpdateCheckRequest {
  app_version: string;
  client_unique_id?: string;
  deployment_key: string;
  is_companion?: boolean;
  label?: string;
  package_hash?: string;
}

export interface UpdateMetrics {
  active: number;
  downloaded?: number;
  failed?: number;
  installed?: number;
}

export interface Account {
  email: string;
  name: string;
  linkedProviders: string[];
}

export interface CollaboratorProperties {
  isCurrentAccount?: boolean;
  permission: string;
}

export interface CollaboratorMap {
  [email: string]: CollaboratorProperties;
}

export interface App {
  collaborators?: CollaboratorMap;
  name: string;
  deployments?: string[];
  os?: string;
  platform?: string;
}

export interface AppCreationRequest extends App {
  manuallyProvisionDeployments?: boolean;
}

export interface Deployment {
  key?: string;
  name: string;
  package?: Package;
}

export interface BlobInfo {
  size: number;
  url: string;
}

export interface PackageHashToBlobInfoMap {
  [packageHash: string]: BlobInfo;
}

export interface Package extends PackageInfo {
  blobUrl: string;
  diffPackageMap?: PackageHashToBlobInfoMap;
  originalLabel?: string;
  originalDeployment?: string;
  releasedBy?: string;
  releaseMethod?: string;
  size: number;
  uploadTime: number;
  releasedByUserId?: string;
  manifestBlobUrl?: string;
}

export interface CodePushError {
  message: string;
  statusCode: number;
}

export interface AccessKey {
  createdTime: number;
  expires: number;
  name: string;
  key?: string;
}

export interface Session {
  loggedInTime: number;
  machineName: string;
}

export interface ReleaseUploadAssets {
  id: string;
  upload_domain: string;
  token: string;
}

export interface UploadReleaseProperties {
  release_upload: ReleaseUploadAssets,
  target_binary_version: string,
  deployment_name?: string,
  description?: string,
  disabled?: boolean,
  mandatory?: boolean,
  no_duplicate_release_error?: boolean,
  rollout?: number
}

export type Headers = { [headerName: string]: string };
