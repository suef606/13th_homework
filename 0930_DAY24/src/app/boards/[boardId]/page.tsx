"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

import badImage from "@assets/bad.png";
import goodImage from "@assets/good.png";
import profileImage from "@assets/profile_image.png";
import linkImage from "@assets/link.png";
import locationImage from "@assets/location.png";
import cheongsanImage from "@assets/cheongsan.png";
import neotubeImage from "@assets/neotube.png";
import hamberger from "@assets/hamberger.png";

import pencil from "@assets/pencil.png";

// fetchBoard(boardId: ID!): Board!
const 나의그래프큐엘셋팅 = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      writer
      title
      contents
      createdAt
    }
  }
`;

export default function BoardsDetailPage() {
  const params = useParams();
  const router = useRouter();

  // params 값 확인
  console.log(params.boardId); // 이 위치에 찍으면 됩니다.

  const { data } = useQuery(나의그래프큐엘셋팅, {
    variables: { boardId: params.boardId },
  });
  //useQuery는 아폴로클라이언트에서 사용을 해주고 잇음

  console.log(data);

  //한국 날짜 등록 방법
  const formattedDate = data?.fetchBoard.createdAt
    ? new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date(data.fetchBoard.createdAt))
    : "";

  const onClickSignup = async (
    // MouseEvent<HTMLButtonElement>는 이 이벤트가 HTML의 <button> 태그에서 발생한 마우스 클릭 이벤트임을 나타냄
    event
  ) => {
    router.push(`/boards`);
  };

  return (
    <div className={styles.detailLayout}>
      <div className={styles.detailBody}>
        <div className={styles.detailFrame}>
          <div className={styles.detailSubject}>{data?.fetchBoard.title}</div>
          <div className={styles.detailMetadataContainer}>
            <div className={styles.detailMetadataProfile}>
              <Image src={profileImage} alt="프로필 이미지" />
              <div>{data?.fetchBoard.writer}</div>
            </div>
            <div className={styles.detailMetadataDate}>
              {formattedDate || "날짜 없음"} {/* formattedDate 사용 */}
            </div>
          </div>
          <div className={styles.enrollBorder}></div>
          <div className={styles.detailMetadataIconContainer}>
            <Image src={linkImage} alt="링크 이미지" />
            <Image src={locationImage} alt="위치 아이콘" />
          </div>
          <div className={styles.detailContentContainer}>
            <Image
              src={cheongsanImage}
              alt="청산 사진"
              className={styles.detailContentImage}
            />
            <div className={styles.detailContentText}>
              {data ? data.fetchBoard.contents : ""}
            </div>
            <Image src={neotubeImage} alt="너튜브 이미지" />
            <div className={styles.detailContentGoodOrBad}>
              <div className={styles.detailGoodContainer}>
                <Image src={badImage} alt="싫어요" />
                <div className={styles.detailBadText}>24</div>
              </div>
              <div className={styles.detailGoodContainer}>
                <Image src={goodImage} alt="좋아요" />
                <div className={styles.detailGoodText}>12</div>
              </div>
            </div>
            <div className={styles.detailButtonsContainer}>
              <button
                className={styles.detailButton}
                onClick={(event) => onClickSignup(event)}
              >
                <Image src={hamberger} alt="메뉴 아이콘" />
                <div>목록으로</div>
              </button>
              <button className={styles.detailButton}>
                <Image src={pencil} alt="수정 아이콘" />
                <div>수정하기</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
