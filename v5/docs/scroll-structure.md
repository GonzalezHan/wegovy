# Scroll Structure

기준 파일: `src/App.jsx`
DOM 테스트 기준 뷰포트 높이: **946px** (MacBook 기준)

## 전체 흐름

1. Intro
2. Scroll 1. Problem
3. Scroll 2. Agitation
4. Scroll 3. Solution
5. Scroll 4. GAS Intro
6. Scroll 5. Data Input
7. Scroll 6. Automation Merge
8. Scroll 7. Result & Distribution
9. Scroll 8. Cases
10. Scroll 9. Interviews
11. Scroll 10. Roadmap
12. Scroll 11. Call To Action
13. Scroll 12. Contact

## 배경 전환 기준

`src/App.jsx`에서 `mainContentRef` (Phase1~Phase5 묶음) 기준으로 배경색이 전환됩니다.
StartIntro는 이 전환 로직 바깥에 별도 섹션으로 존재합니다.

실제 코드 기준 색상 키프레임:

| scrollYProgress | backgroundColor | textColor |
|---|---|---|
| 0.00 ~ 0.08 | `#0a0a0a` (Dark) | `#cecece` |
| 0.08 ~ 0.09 | Dark → Light 전환 | Dark → Dark text 전환 |
| 0.09 ~ 0.65 | `#ffffff` (Light) | `#0f172a` |
| 0.65 ~ 0.75 | Light → Navy 전환 | Light → White 전환 |
| 0.75 ~ 1.00 | `#284283` (Navy) | `#f8fafc` ~ `#ffffff` |

> **주의**: `scrollYProgress`는 `mainContentRef`(Phase1~5 감싸는 motion.div) 기준.
> Intro(StartIntro) 스크롤은 이 progress에 포함되지 않음.

## 섹션별 상세

### Intro

- 파일: `src/components/intro/StartIntro.jsx`
- 헤드카피: `반복 업무를 자동화의 흐름으로 바꿉니다`
- 서브: `재무 업무효율화 TF`
- 역할:
  가장 첫 화면. `START` 클릭 시 왼쪽 `야근` 상태에서 오른쪽 `우리집/칼퇴` 상태로 이동하는 설치형 비유 연출
- 현재 동작:
  - 폴더 아이콘 이동: 2초
  - 도착 후 0.8초 뒤 `우리집 → 칼퇴`
  - 목적지 아이콘 바운스
  - 이후 3.5초 뒤 본문으로 스크롤 이동 (`mainContentRef.scrollIntoView`)

---

### Scroll 1~3 (Phase1)

- 래퍼 파일: `src/components/phase1/Phase1.jsx`
- 높이: `300vh` (실제: **2,838px** / 946px 뷰포트 기준)
- useScroll offset: `['start start', 'end end']`
- 구조:
  sticky 1장 (`h-screen`) 안에서 `Problem → Agitation → Solution`이 progress 기준 순차 전환

#### Scroll 1. Problem

- 파일: `src/components/phase1/Problem.jsx`
- 역할:
  수많은 문서/시트/슬라이드 창이 떠다니는 문제 제기
- 특징:
  - 플로팅 문서 배경
  - 타입라이터형 문서 내용
  - 막대/도넛/카운트업 그래프 모션

#### Scroll 2. Agitation

- 파일: `src/components/phase1/Agitation.jsx`
- 역할:
  휴먼에러, 업무병목, 데이터분산, 비표준화, 단순반복의 감정적 증폭
- 특징:
  - pain point 루프
  - 메신저형 말풍선 등장

#### Scroll 3. Solution

- 파일: `src/components/phase1/Solution.jsx`
- 역할:
  해결 선언

---

### Scroll 4 (GasIntro)

- 파일: `src/components/phase2/GasIntro.jsx`
- 역할:
  GAS가 어떤 도구인지 소개하는 메인 설명 섹션
- 구조:
  - 좌측 카피
  - 우측 `Google Sheets / Google Docs / Google Slides → GAS Runtime` 네트워크
  - 하단 코드 라이브 타이핑
  - 모바일용 별도 축소 레이아웃 포함

---

### Scroll 5~7 (Phase3)

- 파일: `src/components/phase3/Phase3.jsx`
- 높이: `600vh` (실제: **5,676px** / 946px 뷰포트 기준)
- useScroll offset: `['start end', 'end start']` ← Phase1과 다름
- 구조:
  sticky 1장 안에서 3단계 레이어가 progress 기준 순차 fade in/out

#### Scroll 5. Data Input

- progress 기준: `0.1 ~ 0.38` visible
- 구글 폼/시트/슬라이드 조각이 들어오는 단계
- 레이블: `Step 1. Data Input`
- 카피: "더 이상 이메일로 주고받을 필요가 없습니다."

#### Scroll 6. Automation Merge

- progress 기준: `0.32 ~ 0.68` visible
- 레이블: `Step 2. Automation Merge` *(이전 "Automation Magic"에서 변경됨)*
- 마우스 클릭 → 자동 취합 실행 → 검증/병합 단계
- 카피: "흩어진 데이터 조각이 하나의 마스터 뷰로 모입니다."

#### Scroll 7. Result & Distribution

- progress 기준: `0.62 ~ 0.9` visible
- 레이블: `Step 3. Result & Distribution`
- 대시보드 완성 (매출/비용/이익률 카드 + 3종 차트)
- 위고비 봇 알림 팝업 노출 (progress `0.80~0.85`)

---

### Scroll 8~9 (Phase4)

- 래퍼 파일: `src/components/phase4/Phase4.jsx`
- 높이: `300vh` (실제: **2,838px**)
- useScroll offset: `['start end', 'end start']`
- 배경: `bg-slate-50`
- 구조:
  sticky 1장 안에서 `Cases → Interviews`

#### Scroll 8. Cases

- 파일: `src/components/phase4/Cases.jsx`
- progress 기준: `0 ~ 0.58` visible (casesPointer `auto` → `none` at `0.54`)
- 역할:
  사례 카드 4개와 첫 번째 카드 전용 모달
- 현재 인터랙션:
  - 첫 카드 `시너지지원 Weekly Issue`만 클릭 가능
  - 모달 탭:
    - `1. GAS 코드 화면`
    - `2. 코드 실행 과정`
    - `3. 생성된 산출물`
    - `4. DEMO Live`

#### Scroll 9. Interviews

- 파일: `src/components/phase4/Interviews.jsx`
- progress 기준: `0.52 ~ 0.92` visible
- 역할:
  TF 구성원 인터뷰 아바타와 인용문

---

### Scroll 10~12 (Phase5)

- 래퍼 파일: `src/components/phase5/Phase5.jsx`
- 높이: `300vh` (실제: **2,838px**)
- useScroll offset: `['start start', 'end end']`
- 구조:
  sticky 1장 안에서 `Roadmap → CallToAction → ContactUs`가 z-index 및 opacity로 순차 전환

#### Scroll 10. Roadmap

- 파일: `src/components/phase5/Roadmap.jsx`
- progress 기준: `0 ~ 0.33` visible, `0.25~0.33` fade out
- z-index: `z-10`
- 역할:
  미래 자동화 로드맵 4단계
  (Roadmap 01: Data Pipeline, 02: AI Agent 등)

#### Scroll 11. Call To Action

- 파일: `src/components/phase5/CallToAction.jsx`
- progress 기준: `0.28~0.38` fade in, `0.58~0.68` fade out
- z-index: `z-20`
- 역할:
  자동화 이후 확보한 시간을 본질 업무에 투자하자는 메시지
- 카피: "이제 엑셀 대신, 재무의 본질에 집중할 시간입니다."

#### Scroll 12. Contact

- 파일: `src/components/phase5/ContactUs.jsx`
- progress 기준: `0.62~0.72` fade in, `1.0`까지 유지
- z-index: `z-30`
- 역할:
  자동화 아이디어 제안 CTA
- CTA 버튼: "자동화 아이디어 제안하기" (green)
- 배경: Navy (`#284283`) — App.jsx 배경 전환과 연동

---

## DOM 테스트 결과 요약 (2026-03-17)

| 항목 | 측정값 |
|---|---|
| 뷰포트 높이 | 946px |
| 300vh 섹션 실제 높이 | 2,838px |
| 600vh 섹션 실제 높이 | 5,676px |
| sticky 요소 개수 | 4개 |
| sticky 요소 높이 | 946px (= 100vh) |
| 전체 스크롤 길이 | ≈ 14,196px (300×3 + 600×1 = 1,500vh) |

---

## 다른 프로젝트로 옮길 때 최소 유지 포인트

- `App.jsx`의 phase 조립 순서
- `mainContentRef` 기준 배경 색상 keyframe 좌표값
- sticky 구간 높이 (`300vh`, `600vh`)
- Phase3/Phase4의 useScroll offset `['start end', 'end start']` (Phase1/5와 다름)
- `public` 자산 경로
- `Cases.jsx` 내 첫 카드 전용 모달 로직
- `StartIntro.jsx`의 `onStart → scrollIntoView` 연결
