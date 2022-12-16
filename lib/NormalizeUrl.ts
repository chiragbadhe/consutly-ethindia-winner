
export const normalizeUrl = (url: string) => {
	if (!url) return null
	const parsed = new URL(url)

	if (parsed.host === 'ipfs.infura.io') parsed.host = 'lens.infura-ipfs.io'
	if (parsed.protocol == 'ipfs:') {
		return `https://lens.infura-ipfs.io/ipfs/${parsed.hostname != '' ? parsed.hostname : parsed.pathname.slice(2)}`
	}

	return parsed.toString()
}