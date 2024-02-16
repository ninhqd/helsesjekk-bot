export function createPermalink(channelId: string, ts: string): string {
  return `${createChannelPermalink(channelId)}/p${ts.replace(".", "")}`;
}

export function createChannelPermalink(channelId: string): string {
  return `https://diskusjon.slack.com/archives/${channelId}`;
}
