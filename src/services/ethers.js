const ethers = require('ethers');

const dojoAbi = require("../abis/dojo.json");
const octagonAbi = require("../abis/octagon.json");

const Big = require('big.js');

class Ethers {
    constructor() {
        const provider = new ethers.providers.Web3Provider(window.lukso);
        this.provider = provider
        this.signer = this.provider.getSigner();

        this.dojo = new ethers.Contract(process.env.VUE_APP_DOJO_ADDRESS, dojoAbi, this.signer);
        this.octagon = new ethers.Contract(process.env.VUE_APP_OCTAGON_ADDRESS, octagonAbi, this.signer);

        let _this = this;
        provider.send("eth_requestAccounts", []).then(() => {
            const signer = provider.getSigner();
            signer.getAddress().then(address => {
                console.log("ADDRESS: ", address)
                _this.address = address;
                this.address = address;
            })
        })
    }

    connect = async function () {
        const provider = new ethers.providers.Web3Provider(window.lukso);
        this.provider = provider
        this.signer = this.provider.getSigner();

        await provider.send("eth_requestAccounts", []);
        this.address = await this.signer.getAddress();
    }

    mint = async function (billionaire) {
        let price = "0.0001"
        try {
            await this.dojo.callStatic.mint(billionaire, {
                value: ethers.utils.parseEther(price),
                gasLimit: 500000
            });
        } catch (err) {
            alert(err.reason);
            return false;
        }

        try {
            const tx = await this.dojo.mint(billionaire, {
                value: ethers.utils.parseEther(price),
                gasLimit: 500000
            });
            await tx.wait();
            return true;
        } catch (err) {
            console.log(err.reason);
            alert(err.reason);
            return false;
        }
    }

    mintMultiple = async function(billionaire, amount) {
        const price = new Big('0.0001').times(amount);

        console.log("PRICE: ", price)
        try {
            await this.dojo.callStatic.mintMultiple(billionaire, amount, {
                value: ethers.utils.parseEther(`${price}`),
                gasLimit: 1500000
            });
        } catch (err) {
            alert(err.reason);
            return false;
        }

        try {
            const tx = await this.dojo.mintMultiple(billionaire, amount, {
                value: ethers.utils.parseEther(`${price}`),
                gasLimit: 1500000
            });
            await tx.wait();
            return true;
        } catch (err) {
            console.log(err.reason);
            alert(err.reason);
            return false;
        }
    }

    tokenUri = async function (tokenId) {
        try {
            const tokenUri = await this.dojo.tokenURI(tokenId);
            return tokenUri;
        } catch (e) {
            alert(e.reason);
            return false;
        }
    }

    getMintPrice = async function () {
        try {
            const mintPrice = await this.tx.mintPrice();
            return mintPrice;
        } catch (e) {
            alert(e.reason);
            return false;
        }
    }

    getStat = async function (tokenId) {
        try {
            const stat = await this.dojo.getStat(tokenId);
            return stat;
        } catch (e) {
            alert(e.reason);
            return false;
        }
    }

    getTeamMemberCount = async function (billioaire) {
        try {
            const teamMemberCount = await this.dojo.teamMemberCount(billioaire);
            return teamMemberCount;
        } catch (e) {
            alert(e.reason);
            return false;
        }
    }

    getTeamBalance = async function (billionaire) {
        try {
            const teamBalance = await this.dojo.teamBalances(billionaire);
            return teamBalance;
        } catch (e) {
            alert(e.reason);
            return false;
        }
    }

    isInOctagon = async function (tokenId) {
        try {
            const isInOctagon = await this.octagon.isInOctagon(tokenId);
            return isInOctagon;
        } catch (e) {
            alert(e.reason);
            return false;
        }
    }

    enterOctagon = async function (tokenId, level, maxRounds) {
        try {
            const tx = await this.octagon.enterOctagon(tokenId, level, maxRounds);
            await tx.wait();
            return true;
        } catch (e) {
            alert(e.reason);
            return false;
        }
    }

    leaveOctagon = async function (tokenId) {
        try {
            const tx = await this.octagon.leaveOctagon(tokenId);
            await tx.wait();
            return true;
        } catch (e) {
            alert(e.reason);
            return false;
        }
    }

    pickAFight = async function (tokenId, level, opponentTeam, emitter) {
        try {
            const tx = await this.octagon.pickAFight(tokenId, level, opponentTeam, {gasLimit: 500000});
            emitter.emit('fight-picked');
            await tx.wait();
            return true;
            
        } catch (e) {
            console.log("anyad fasza 1")
            alert(e.reason);
            return false;
        }
    }

    getRecoverInfo = async function (tokenId) {
        try {
            const recoverInfo = await this.octagon.recoverInfos(tokenId);
            return recoverInfo;
        } catch (e) {
            alert(e.reason);
            return false;
        }
    }

    enterRecoveryZone = async function (tokenId) {
        try {
            const tx = await this.octagon.enterRecoveryZone(tokenId);
            await tx.wait();
            return true;
        } catch (e) {
            alert(e.reason);
            return false;
        }
    }

    leaveRecoveryZone = async function (tokenId) {
        try {
            const tx = await this.octagon.leaveRecoveryZone(tokenId);
            await tx.wait();
            return true;
        } catch (e) {
            alert(e.reason);
            return false;
        }
    }

    getStat = async function (tokenId) {
        try {
            const stat = await this.dojo.getStat(tokenId);
            return stat;
        } catch (e) {
            alert(e.reason);
            return {};
        }
    }

    getOctagonEntryForToken = async function (tokenId) {
        try {
            const octagonEntry = await this.octagon.getOctagonEntryForToken(tokenId);
            return octagonEntry;
        } catch(e) {
            alert(e.reason);
            return {};
        }
    }

    getTokenCount = async function() {
        try {
            const tokenCount = await this.dojo.count();
            return tokenCount.toNumber();
        } catch(e) {
            alert(e.reason);
            return {};
        }
    }

    getTotalFights = async function() {
        try {
            const numFights = await this.octagon.getFightsLength();
            return numFights.toNumber();
        } catch(e) {
            alert(e.reason);
            return {};
        }
    }

    getInOctagonCount = async function() {
        try {
            const inOctagon = await this.octagon.inOctagonLength();
            return inOctagon.toNumber();
        } catch(e) {
            alert(e.reason);
            return {};
        }
    }

    walletOfOwner = async function () {
        let tokenIdsNums = [];

        const tokenIds = await this.dojo.tokenIdsOf(this.address);

        for (let i = 0; i < tokenIds.length; i++) {
            // eslint-disable-next-line no-undef
            const bigIntValue = BigInt(tokenIds[i]);
            tokenIdsNums.push(Number(bigIntValue))
        }

        return tokenIdsNums;
    }

    getTokenInfo = async function(tokenId) {
        try {
            const tokenInfo = await this.octagon.getTokenInfo(tokenId);
            return tokenInfo;
        } catch(e) {
            alert(e.reason);
            return {};
        }
    }
}

export default Ethers;