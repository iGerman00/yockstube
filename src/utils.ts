import { PlaylistInfo, VideoInfo } from "./types";

export async function isChannelVerified(channelId: string): Promise<boolean> {
	const page = await fetch(`https://iteroni.com/api/v1/channels/${channelId}?hl=en&fields=authorVerified`, {
		headers: {
			// set language to english
			'Accept-Language': 'en-US,en;q=0.9',
			'User-Agent': 'Mozilla/5.0 (compatible; Yockstube/1.0; +https://github.com/igerman00/yockstube)',
		},
	});
	const json: { authorVerified: boolean; } = await page.json();
	return json.authorVerified;
}

export async function getVideoInfo(videoId: string): Promise<VideoInfo> {
	const page = await fetch(`https://iteroni.com/api/v1/videos/${videoId}?hl=en&fields=title,videoThumbnails,description,publishedText,viewCount,likeCount,dislikeCount,author,authorUrl,authorId,subCountText,isListed,liveNow,formatStreams`, {
		headers: {
			'Accept-Language': 'en-US,en;q=0.9',
			'User-Agent': 'Mozilla/5.0 (compatible; Yockstube/1.0; +https://github.com/igerman00/yockstube)',
		},
	});

	const json: VideoInfo = await page.json();

	return json;
}

export async function getPlaylistInfo(playlistId: string): Promise<PlaylistInfo> {
	const page = await fetch(`https://iteroni.com/api/v1/playlists/${playlistId}?hl=en`, {
		headers: {
			'Accept-Language': 'en-US,en;q=0.9',
			'User-Agent': 'Mozilla/5.0 (compatible; Yockstube/1.0; +https://github.com/igerman00/yockstube)',
		},
	});

	const json: PlaylistInfo = await page.json();

	return json;
}

export async function isMix(playlistId: string, request: Request): Promise<boolean> {
	const isMusic = request.url.startsWith('https://music') || request.url.startsWith('https://www.music');
	return isMusic;

	// not sure if to include the rest, for now no need

	const page = await fetch(`https://iteroni.com/api/v1/playlists/${playlistId}?hl=en&fields=mixId,playlistId`, {
		headers: {
			'Accept-Language': 'en-US,en;q=0.9',
			'User-Agent': 'Mozilla/5.0 (compatible; Yockstube/1.0; +https://github.com/igerman00/yockstube)',
		},
	});
	const url = new URL(page.url);
	const isMix = url.pathname.startsWith('/api/v1/mixes')
	return isMix;
}

export function stripTracking(link: string) {
	const url = new URL(link);
	url.searchParams.delete('feature');
	url.searchParams.delete('pp');
	url.searchParams.delete('si');
	url.searchParams.delete('a');
	url.searchParams.delete('utm_source');
	url.searchParams.delete('utm_medium');
	url.searchParams.delete('utm_campaign');
	url.searchParams.delete('gclid');
	url.searchParams.delete('fbclid');
	url.searchParams.delete('cid');
	url.searchParams.delete('mc_cid');
	url.searchParams.delete('mc_eid');
	url.searchParams.delete('yclid');
	url.searchParams.delete('cmp');
	url.searchParams.delete('context');
	url.searchParams.delete('keyword');
	url.searchParams.delete('source');
	url.searchParams.delete('medium');
	url.searchParams.delete('campaign');
	url.searchParams.delete('term');
	url.searchParams.delete('content');

	return url.toString();
}