# 2회차 미션: NFT 스마트 컨트랙트 (ERC721) 개발 (with Alchemy)

---

**Solidity를** 사용하여 **Smart Contract를** **개발하여** 블록체인에 도입하는 것은 처음에는 어려워 보일 수 있습니다. 솔리디티, 보안, 가스 최적화, 개발자 환경 및 가스 요금 등은 블록체인 코드를 배포하기 전에 신경써야 하는 것들 중 고작 일부에 불과합니다. 

다행히도 지난 몇 달 사이에 개발자들이 스마트 컨트랙트 개발 작업을 훨씬 쉽게 할 수 있게 하기 위해 많은 도구들이 출시되었습니다.

**OpenZeppelin** **Wizard**와 같은 툴을 통해 개발자는 클릭 및 쓰기 기능을 가지고 즉시 쉽고 안전하게 스마트 컨트랙트를 만들 수  있으며, 이걸 Alchemy와 같은 Web3 개발자 도구와 함께 사용하면 이전보다 쉽고 빠르게 블록 체인에 코드를 작성하고 배포할 수 있습니다.

이 튜토리얼에서는 **Alchemy, OpenZeppelin, Remix 및 Etherin Goerli를** **사용하여 ERC721(NFT)** 스마트 계약을 **개발하고** **구축하는** **방법에** **대해** **설명**합니다**.**

보다 정확하게는 다음과 같은 내용을 학습할 수 있습니다.

- OpenZeppelin 및 Remix를 사용하여 스마트 계약서를 작성하고 수정하는 방법
- https**[://goerlifaucet.com/에서** **무료로** Goerli ETH](https://goerlifaucet.com/)를 이용하기
- Etherinum Goerli 테스트넷 블록체인에 도입하여 가스요금 절감
- Filebase를 사용하여 IPFS에서 NFT 토큰 메타데이터를 호스팅
- NFT를 제작하여 OpenSea에 시각화

아래처럼 비디오 튜토리얼도 있습니다.

[https://youtu.be/veBu03A6ptw](https://youtu.be/veBu03A6ptw)

먼저,  스마트 계약을 작성하겠습니다.

# **OpenZeppelin Contract Wizard를 사용하여 ERC721 스마트** 컨트랙트 **개발하기**

---

앞서 설명한 바와 같이 이 튜토리얼에서는 **OpenZeppelin 마법사를** **사용하여  스마트** **계약을** **작성합니다. OpenZeppelin을 사용하는 데에는** 두 가지 주요 이유가 있습니다.

- **OpenZeppelin은** 안전합니다.
- 표준 스마트 계약을 제공합니다.

현명한 계약 작성에 있어서는 보안이 중요합니다. 보안 불량으로 악덕 행위자들이 수억 달러를 빼돌린 스마트 계약 악용 사례도 수두룩합니다. 

> *체인에 올린 암호화폐나 NFT를* *다른* *사람이* *모두* *훔쳐가는* *것은* *원치* *않으시겠죠 ?*
> 

**OpenZeppelin**은 스마트 계약 표준(ERC20, ERC721 등)을 가장 활발히 관리하고 유지하는 기업 중 하나입니다. 때문에 개발자는 철저히 감사된 코드를 사용하여 신뢰할 수 있는 계약을 개발할 수 있습니다.

ERC721 NFT 스마트 계약을 작성하기 위해 가장 먼저 **[해야** **할** **일은 Open](https://docs.openzeppelin.com/contracts/4.x/wizard) Zeppelin 스마트** **계약** **마법사** **페이지로** **이동하는** **것입니다.**

페이지가 열리면 다음 편집기가 표시됩니다: 

![https://files.readme.io/9e820fe-erc721.png](https://files.readme.io/9e820fe-erc721.png)

왼쪽 상단 모서리에 있는 ERC721 버튼을 클릭하여 사용할 ERC 표준 유형과 작성할 계약 유형을 선택합니다: 

![https://files.readme.io/828ee6a-Erc721_2.png](https://files.readme.io/828ee6a-Erc721_2.png)

계약 기준을 선택했으면 왼쪽 메뉴에 여러 가지 옵션을 볼 수 있습니다. 

먼저 토큰의 이름과 기호를 선택합니다. "MyToken"이 있는 텍스트 상자를 클릭하고, 이름을 지정하고, 기호를 사용하여 동일한 작업을 수행한 다음, 기본 URI 필드를 비워 둡니다(토큰 이름은 OpenSea 및 Rarible에서 “컬렉션 이름”으로 사용될 것입니다)

![https://files.readme.io/7c6e435-Alh_set.png](https://files.readme.io/7c6e435-Alh_set.png)

# **NFT(ERC721) 토큰의 기능** **선택하기**

---

이제 스마트 계약에 포함시킬 기능들을 선택해야 합니다. 설정settings 섹션을 선택하면 기능features 섹션이 나옵니다. 여기서 스마트 계약에 포함할 다양한 모듈을 선택할 수 있습니다. 

![Untitled](2%E1%84%92%E1%85%AC%E1%84%8E%E1%85%A1%20%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%20NFT%20%E1%84%89%E1%85%B3%E1%84%86%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8F%E1%85%A5%E1%86%AB%E1%84%90%E1%85%B3%E1%84%85%E1%85%A2%E1%86%A8%E1%84%90%E1%85%B3%20(ERC721)%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%20(%20bf2fe574de824c509eb5080a6239ba0c/Untitled.png)

우리는 이 예시에서 다음 연동을 선택할 겁니다. 

- **Mintable**은 특권previledged를 가진 계정에서만 호출 가능한 Mint 함수를 만들 수 있습니다.
- **Autoincrement** ID는 NFT에 1씩 증가하는 고유번호 ID를 자동으로 할당합니다.
    - ex) (첫 번째 ID =  1, 이후 2,3,4….)
- **Enumerable**을 사용하면 **온체인** **토큰의** enumeration이나 function에 접근 가능해지며, 이를 통해 NFT에 메타데이터 및 이미지를 연결하는게 가능합니다
    - ex) **"**Total supply" function으로 공급량 합계 내는 기능
    - 현재 ERC721의 URI 스토리지 기본값에는 이 세팅이 되어있지 않으며, openzeppelin에만 가능함.
- **URI Storage**를 사용해서 NFT에 URI를 연결할 수 있습니다.

![https://files.readme.io/d4a7d1d-Screenshot_2022-05-01_at_17.20.48.png](https://files.readme.io/d4a7d1d-Screenshot_2022-05-01_at_17.20.48.png)

이 튜토리얼의 진행을 위해서 다음 항목은 선택하지 마십시오. (일반적으로 NFT로는 Tokenomics를 만들지 않는게 좋습니다) 

- Burnable - 토큰을 소각할 수 잇습니다.
- **Pausable** - 토큰 전송, 판매 등을 일시 중지합니다.
- **Votes** - 대의원 및 투표와 같은 거버넌스 기능을 이용할 수 있습니다.

이러한 모듈에 대한 자세한 내용은 [ERC721 표준에 대한 OpenZeppelin 문서](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721)를 확인해 주십시오. 

이제 원하는 기능을 선택했으니,  OpenZeppelin Wizard가 Smart Contract 아래처럼 코드를 작성해 줄 겁니다. 

```bash
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Alchemy is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    constructor() ERC721("Alchemy", "ALC") {}

    function safeMint(address to, uint256 tokenId, string memory uri)
        public
        onlyOwner
    {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```

이제 이 코드를 복사해서 Remix IDE에 가져온 다음 블록체인에 수정하고 배포할 겁니다

# **REMIX IDE를 사용하여 ERC721 계약** **변경** **및  도입**

---

이제 ERC721 스마트 컨트랙트가 생겼으니, 이를 수정하여 Goerli Testnet에 배포해 보겠습니다. 우리는 Solidity와의 스마트 계약 개발을 위해 특별히 설계된 **Remix IDE를** **사용합니다. (**무료인 웹 기반 통합 개발 환경입니다!) 

먼저  OpenZeppelin Wizard 에디터 위에 " 리믹스에서 열기" 버튼이 있습니다.

![https://files.readme.io/108c79e-Remix.png](https://files.readme.io/108c79e-Remix.png)

클릭하면 브라우저의 새 탭에 REMIX IDE가 열립니다.

## **리믹스를** **사용한 NFT 스마트** 컨트랙트 **변경**

---

계약서 첫머리에는 코드의 라이선스를 지정하는 「SPDX-License-Identifier」가 있습니다. Web3 어플리케이션에서는 신뢰성을 확보하기 위해서 코드를 오픈소스로 유지하는 것이 좋습니다.

```bash
// SPDX-License-Identifier: MIT
```

다음 줄에는 pragma가 있습니다. 이거는 스마트 계약 코드를 컴파일하기 위해 사용하는 **컴파일러** 버전을 나타내 줍니다. "^" 기호는  0.8.0에서 0.8.9 사이의 모든 버전이 이 코드를 컴파일하는 데 적합함을 컴파일러에게 알려줍니다.

```bash
pragma solidity ^0.8.4;
```

그런 다음 많은 라이브러리를 가져오고 스마트 계약을 초기화합니다.

```bash

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
```

그런 다음 계약을 초기화하고  OpenZeppelin 저장소에서   가져오는 모든 표준을 상속합니다.

```bash
contract Alchemy is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {...}
```

safeMint 함수에는 "only owner"라는 수식어modifier가 있습니다. 이 수식어는 스마트 컨트랙트 소유자 (스마트 컨트랙트 배포한 지갑 주소)만이 NFT를 발행할 수 있게 제한합니다. 만약 다른 사용자가 NFT를 Mint할 수 있게 하고 싶다면, safeMint 함수에서 onlyOwner를 삭제해야 할 수 있습니다.

```bash
function safeMint(address to, string memory uri) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
```

아니면 라이브러리를 임포트해 올 때 아예 빼버려도 됩니다. 다음 문장을 빼세요

```bash
import "@openzeppelin/contracts/access/Ownable.sol";
```

이제 모든 사람이 NFT를 민트할 수 있게 되었으므로 컬렉션의 최대 NFT 수보다 많은 NFT를 주조하는 경우를 피해야 합니다. 그러기 위해서는, 발행 가능한 NFT 의 최대수를 지정합니다.

사용자가 총 10,000개의 NFT를 제작할 수 있기를 원한다고 가정해 봅시다. 그러기 위해서는 새로운 uint256 변수를 생성하여 MAX_SUPPLY라고 하고 10,000을 할당합니다.

```bash
Counters.Counter private _tokenIdCounter;
    uint256 MAX_SUPPLY = 10000;

    constructor() ERC721("Alchemy", "ALCH") {}
```

이제 safeMint 함수로 다시 이동하여 18줄에 require 문을 추가합니다. 이러면 발행양이 최대 공급량에 도달 했을때, “최대 공급량에 도달했습니다. 미안합니다” 라는 문구가 뜨고 발행이 제한됩니다. 

```bash
require(_tokenIdCounter.current() <= MAX_SUPPLY, "I'm sorry we reached the cap");
```

["require" 선언문에 대한 자세한](https://docs.soliditylang.org/en/v0.4.24/control-structures.html#error-handling-assert-require-revert-and-exceptions) 내용은 공식  문서를 참조하십시오.

NFT의 최대 공급량을 제한했으므로 이제 스마트 계약을 컴파일하여 Goerli Testnet에 도입하면 됩니다. 그러기 위해서는 [Alchemy.com에 **무료**](https://alchemy.com/?a=roadtoweb3weekone) 계정을 만들고 메타마스크에 노드 프로바이더로 추가하여 무료 Goerli ETH를 얻어야 **합니다.**

# ALCHEMY **계정** **만들기 (무료)**

---

먼저 alchemy[.com에 접속](https://alchemy.com/?a=roadtoweb3weekone)하여 "로그인"을 클릭하여 새 계정을 만들어야 합니다.

![https://files.readme.io/56d3600-web3_eco.png](https://files.readme.io/56d3600-web3_eco.png)

Ethereum 에코시스템을 선택합니다.

![https://files.readme.io/7719099-ether_eco.png](https://files.readme.io/7719099-ether_eco.png)

앱 및 팀 이름을 지정하고 Goerli 네트워크를 선택한 후 “앱 만들기 Create App”를 클릭합니다.

![https://files.readme.io/45f0d4b-Screen_Shot_2022-09-22_at_10.00.53_AM.png](https://files.readme.io/45f0d4b-Screen_Shot_2022-09-22_at_10.00.53_AM.png)

이 온보딩 프로세스가 완료되면 대시보드로 리디렉션됩니다. 아까 지어준 우리의 앱 이름을 클릭하고, “test” 를 누르고, **오른쪽** **상단의 “VIEW KEY” 버튼**을 클릭해, HTTP URL 를 카피합니다

![https://files.readme.io/d2c8933-Screen_Shot_2022-09-22_at_10.13.54_AM.png](https://files.readme.io/d2c8933-Screen_Shot_2022-09-22_at_10.13.54_AM.png)

다음으로 Alchemy를  Metamask에 Goerli  RPC 프로바이더로  추가해야 합니다. 메타마스크가 설치되어 있지 않은 경우 안내에 따라 브라우저에 메타마스크를 추가하고 새 지갑을 만드십시오.

## **메타마스크 지갑에 Alchemy Goerli 추가**

---

메타마스크가 설치되면 [ 네트워크]드롭다운  메뉴를 클릭하여  [네트워크 추가]를  선택합니다.

![https://files.readme.io/af70d3f-Screen_Shot_2022-09-22_at_1.28.09_PM.png](https://files.readme.io/af70d3f-Screen_Shot_2022-09-22_at_1.28.09_PM.png)

다음 페이지로 이동합니다. Goerli  네트워크 및 RPC URL 정보를 입력해야 합니다.

![https://files.readme.io/6ca3599-Screen_Shot_2022-09-22_at_1.39.28_PM.png](https://files.readme.io/6ca3599-Screen_Shot_2022-09-22_at_1.39.28_PM.png)

다음 정보를 양식에 추가합니다.

- **네트워크명:** Alchemy Goerli
- new RPC **URL:** Goerli Alchemy 응용 프로그램의 HTTP URL
- **체인 ID:** 5
- **통화** **기호:** GoerliETH
- **블록** **탐색기:** [https://goerli.etherscan](https://goerli.etherscan.io/).io

Alchemy를 사용하여 메타마스크에  Goerli를 추가했다니! 대단합니다. 🎉

**이제** **Goerli에 Smart Contract를** 배포할 때입니다만, 그 전에 Goerli Test ETH를 취득할 필요가 있습니다.

## **무료 Goerli 테스트넷 ETH 가져오기**

---

Goerli Test ETH를 얻는 방법은 매우  간단합니다. [goerlifaucet.com로 이동](https://goerlifaucet.com/)하여 지갑 주소를 텍스트 바에 복사한 후 " Send Me ETH "를 클릭하십시오.

![https://files.readme.io/f3d2940-goe.png](https://files.readme.io/f3d2940-goe.png)

10~20초 후에 메타마스크 지갑에 Goerli ETH가 나타납니다. 로그인하지 않은 상태에서는 최대 0.1 ETH를 24시간마다 받을 수 있습니다. (Alchemy 계정을 사용하면 24시간마다 0.5ETH를 받습니다)

이제 ETH 테스트를 **마쳤으니** **블록체인에 NFT 스마트** **계약을** **컴파일하고** **도입할** **차례입니다.**

# **Goerli 테스트넷에서의 NFT Smart Contract 컴파일** **및** **전개**

---

Remix로 돌아가서 페이지 왼쪽에 있는 컴파일러compiler 메뉴를 클릭하고 파란색 "컴파일" 버튼을 클릭합니다.

![https://files.readme.io/c0c058f-solid_compiler.png](https://files.readme.io/c0c058f-solid_compiler.png)

다음으로 “Deploy and Run Transactions” 메뉴를 클릭하고 “Environment” 드롭다운 메뉴를 클릭하여 “Injected Web3”를 선택합니다.

**메타마스크** **지갑이 Alchemy Goerli 네트워크에** **있는지** 꼭 확인하시고, Contract 드롭다운 메뉴에서 NFT Smart 계약을 선택한 다음 Deploy를 클릭합니다.

![https://files.readme.io/e249393-dep.png](https://files.readme.io/e249393-dep.png)

메타마스크 팝업창이 뜨면 "sign"을 클릭한 후 가스 요금을 지불합니다.

모든 것이 제대로 동작했을 경우, 10초 후에 “Deployed Contracts” (배포된 계약) 하단에 방금 배포한 스마트 컨트랙트가 나열됩니다.

![https://files.readme.io/6630f89-deployed_contracts.png](https://files.readme.io/6630f89-deployed_contracts.png)

이제 스마트 계약이 Goerli 테스트넷에 도입되었으니, NFT를 민팅할 차례입니다. 그 전에 먼저 메타데이터를 만들고 IPFS에 업로드해야 합니다. 메타데이터라는 용어의 의미를 이해합시다.

# **NFTS 메타데이터란?**

---

![https://files.readme.io/8a5f1ab-octopus.png](https://files.readme.io/8a5f1ab-octopus.png)

OpenSea가 ERC721 토큰의 오프체인 메타데이터를 가져오려면 (풀인 pull in) 하려면 이 NFT 컨트랙트가 **호스팅하는(=바라보는)** 메타데이터를 명시하는 **URI가 있어야 합니다.** 이 URI를  찾기 위해 OpenSea, Rarible 및 기타 인기 마켓플레이스는 ERC721Uristage 표준에 포함된 tokenURI 메서드를 사용합니다. 

tokenURI 함수는 ipfs://bafkreig4rdq3nvyg2yra5x363gdo4xtbcfjlshw63vtldyvwagbq 와 같은 **HTTP 또는 IPFS URL을 반환**해야 합니다. 쿼리를 받았을 때, 이 URL은 토큰의 메타데이터을 포함한 JSON 데이터 블록을 반환합니다.

[메타데이터 표준에 대한 자세한](https://docs.opensea.io/docs/metadata-standards) 내용은 OpenSea 공식 설명서를 참조하십시오.

## **NFT 메타데이터** **포맷** **방법**

---

OpenSea 문서에 따르면 NFT 메타데이터는 .json 파일에 저장되고 다음과 같이 구성되어야 합니다.

```json
{ 
  "description": "YOUR DESCRIPTION",
  "external_url": "YOUR URL",
  "image": "IMAGE URL",
  "name": "TITLE", 
  "attributes": [
    {
      "trait_type": "Base", 
      "value": "Starfish"
    }, 
    {
      "trait_type": "Eyes", 
      "value": "Big"
    }, 
    {
      "trait_type": "Mouth", 
      "value": "Surprised"
    }, 
    {
      "trait_type": "Level", 
      "value": 5
    }, 
    {
      "trait_type": "Stamina", 
      "value": 1.4
    }, 
    {
      "trait_type": "Personality", 
      "value": "Sad"
    }, 
    {
      "display_type": "boost_number", 
      "trait_type": "Aqua Power", 
      "value": 40
    }, 
    {
      "display_type": "boost_percentage", 
      "trait_type": "Stamina Increase", 
      "value": 10
    }, 
    {
      "display_type": "number", 
      "trait_type": "Generation", 
      "value": 2
    }]
  }
```

## 메타데이터를 작성하고 IPFS에 업로드하기

---

filebase.com에 접속하고 새 계정을 만드세요. 

그걸로 로그인을 마치고, 왼쪽의 버켓bucket 버튼을 누르고 새 버켓을 만듭시다 

![https://files.readme.io/73f3bad-filebase.png](https://files.readme.io/73f3bad-filebase.png)

그 버켓 안으로 들어갑시다. upload 버튼을 누르고, NFT에 사용할 이미지를 업로드합니다. 저는 이 [이미지](https://ipfs.filebase.io/ipfs/bafybeihyvhgbcov2nmvbnveunoodokme5eb42uekrqowxdennt2qyeculm)를 사용하겠습니다. 

업로드를 마친 후, 그 파일을 클릭한 다음 IPFS Gateway URL을 복사하세요 

![https://files.readme.io/5bd8524-ipfs.png](https://files.readme.io/5bd8524-ipfs.png)

아무 텍스트 에디터나 사용해서 아래의 JSON 코드를 붙여넣어줍니다. 

```json
{ 
  "description": "This NFT proves I've created and deployed my first ERC20 smart contract on Goerli with Alchemy Road to Web3",
  "external_url": "Alchemy.com/?a=roadtoweb3weekone",
  "image": "https://ipfs.filebase.io/ipfs/bafybeihyvhgbcov2nmvbnveunoodokme5eb42uekrqowxdennt2qyeculm",
  "name": "A cool NFT", 
  "attributes": [
    {
      "trait_type": "Base", 
      "value": "Starfish"
    }, 
    {
      "trait_type": "Eyes", 
      "value": "Big"
    }, 
    {
      "trait_type": "Mouth", 
      "value": "Surprised"
    }, 
    {
      "trait_type": "Level", 
      "value": 5
    }, 
    {
      "trait_type": "Stamina", 
      "value": 1.4
    }, 
    {
      "trait_type": "Personality", 
      "value": "Sad"
    }, 
    {
      "display_type": "boost_number", 
      "trait_type": "Aqua Power", 
      "value": 40
    }, 
    {
      "display_type": "boost_percentage", 
      "trait_type": "Stamina Increase", 
      "value": 10
    }, 
    {
      "display_type": "number", 
      "trait_type": "Generation", 
      "value": 2
    }]
  }
```

그리고 파일을 "metadata.json"으로 저장합니다. Filebase로 돌아가서  이미지를 업로드한 버킷에 metadata.json 파일을 업로드합니다.

![https://files.readme.io/6ecc402-metadata.png](https://files.readme.io/6ecc402-metadata.png)

마지막으로 CID를 클릭하여 복사합니다. NFT를 발행할 때 토큰 URI를 작성할 때 필요합니다.

![https://files.readme.io/8767656-cid.png](https://files.readme.io/8767656-cid.png)

# **Goerli NFT를 민팅해보자**

---

Remix로 돌아가서 “Deploy & Run Transactions” 메뉴에서 “Deployed contracts”(배포된 컨트랙트)로 이동하여 방금 배포한 컨트랙트를 클릭하면 Smart Contact에 포함된 모든 메서드 목록이 나타납니다.

![https://files.readme.io/0a614b5-rin_nft.png](https://files.readme.io/0a614b5-rin_nft.png)

오렌지색 메서드는 실제로 블록체인에 작성되는 메서드들이며, 파란색 메서드는 블록체인을 통해 학습하는 메서드입니다.

“safeMint” 메서드의 드롭다운 아이콘을 클릭하여 주소와 다음 문자열을 uri 필드에 붙여넣습니다.

```json
ipfs://\<your\_metadata\_cid>
```

트랜잭션을 클릭하면 가스 요금을 지불하라는 메타마스크 팝업이 생성됩니다.

"sign"을 클릭하고 첫 NFT를 발행하십시오!

몇 초간 기다렸다가 Mint가 정상적으로 처리되었는지 확인하기 위해 “balanceOf” 메서드 입력에 주소를 복사하여 붙여넣은 후 실행합니다. NFT가 1개가 나와야 합니다. 

tokenURI 메서드에서도 동일하게 주소를 넣고 id 인수로 "0"을 삽입해 보십시오.  tokenURI가 나타나면 정상입니다. 

대단합니다! NFT를 처음 만들었잖아! 🎉

**이제** OpenSea로 이동하여 메타데이터가 읽기 시작하는지 확인합니다.

# **OpenSea에서 NFT를** **시각화**

---

testnets.opensea.io으로 이동하여 **메타마스크** **지갑**으로 로그인하십시오. 그런 다음 프로필 사진을 클릭하면 새로 주조된 NFT를 볼 수 있습니다. 이미지가 아직 표시되지 않으면 이미지를 클릭하고 "메타데이터 새로 고침" 버튼을 클릭합니다.

![https://files.readme.io/3256828-testnet.png](https://files.readme.io/3256828-testnet.png)

때때로 OpenSea는 테스트넷 메타데이터를 인식하는 데 어려움을 겪으며, 이를 확인하는 데 최대 6시간이 걸릴 수 있습니다. [잠시 후 **NFT가 다음과 같이 표시**](https://testnets.opensea.io/assets/mumbai/0x5a411430964664412e69cff1134759f6bb57c5d7/1)됩니다.

![https://files.readme.io/b36cf81-erc_testnet.png](https://files.readme.io/b36cf81-erc_testnet.png)

**축하합니다. 첫** **번째** **스마트** **계약을** **성공적으로** **작성, 수정** **및** **배포했습니다. 첫 NFT를** **제작하여 IPFS에** **이미지를 공개했습니다!** 🔥

**이제 다음은?** 사용자가 특정 수의 NFT만 발행할 수 있도록 스마트 계약을 수정하는 것은 어떨까요? 사용자당 5개면 충분합니다. 그렇지 않으면 누군가가 수천 개의 NFT를 발행하기 시작할 수도 있습니다.

그러기 위해서는 맵 타입에 대해 알아보세요.여기서 설명하는 놀라운 가이드가 있습니다.

Proof of Knowledge NFT를 취득하려면 위의 과제를 완료하고 [#지식증명서 제출 채널의 Alchemy University Disconsidge Server에 대한](https://university.alchemy.com/discord) 리뷰를 공유할 수 있습니다. 

다음 강의에서 만나요!
