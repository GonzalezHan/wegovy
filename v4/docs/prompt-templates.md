# Prompt Templates for Rebuilding v4

현재 `v4`와 같은 구조의 페이지를 가장 빠르게 재현하기 위해 쓸 수 있는 프롬프트 템플릿 3종입니다.

## 1. Design Work Prompt

사용 상황:
- 디자인/카피/인터랙션까지 폭넓게 재현하고 싶을 때
- 결과물의 완성도와 화면 흐름이 중요할 때

```text
/Users/gonzalez/codex_위고비 작업공간에서 바로 작업해줘.

목표:
- `v3`를 베이스로 `v4`를 새로 만들고, 현재 v4 수준의 스크롤형 랜딩 페이지를 재현한다.
- 스크롤 구조의 기준 문서는 아래 파일 하나로 통일한다:
  `/Users/gonzalez/.gemini/antigravity/brain/602bf2d9-d0b4-4c53-a5b2-a95bbcc17c9e/scroll_f.md`

핵심 요구사항:
1. 먼저 현재 코드베이스와 `v3` 구조를 읽고 이해한 뒤 구현한다.
2. `scroll_f.md` 기준으로 Scroll 1~12의 서사 구조를 유지한다.
3. 기존 컴포넌트 구조와 phase 분리는 최대한 유지한다.
4. 디자인은 단순 복제가 아니라 현재 v4처럼 의도 있는 인터랙션과 화면 전환까지 반영한다.
5. 각 phase의 카피, 카드, 사례, 모달, 인터뷰, CTA, 인트로를 실제 동작하는 형태로 구현한다.
6. 필요한 public asset과 영상/이미지 연결까지 반영한다.
7. 각 큰 변경 후 `npm run build`로 검증한다.

작업 범위:
- `v4` 폴더 생성 또는 정리
- Intro 추가
- Scroll 1~12 구현
- Scroll 8 사례 카드 + Weekly Issue 모달 + DEMO Live 구현
- 문서화용 md 파일 정리

작업 방식:
- 제안서보다 구현을 우선한다.
- 애매한 부분은 현재 `v3` 패턴과 `scroll_f.md`를 기준으로 합리적으로 결정한다.
- 매 단계 진행 상황은 짧게 공유한다.
- 막히지 않으면 질문하지 말고 계속 진행한다.

마지막 응답:
- 바뀐 핵심
- 검증 결과
- 남은 리스크 또는 다음 추천 작업
만 간단히 정리해라.
```

## 2. Coding Agent Prompt

사용 상황:
- 코딩 에이전트가 바로 파일 수정에 들어가게 하고 싶을 때
- 구조 유지, 구현 속도, 오류 최소화가 중요할 때

```text
다음 조건으로 바로 구현해줘.

작업 경로:
- `/Users/gonzalez/codex_위고비`

기준:
- 베이스 폴더: `v3`
- 목표 폴더: `v4`
- 스크롤 기준 문서:
  `/Users/gonzalez/.gemini/antigravity/brain/602bf2d9-d0b4-4c53-a5b2-a95bbcc17c9e/scroll_f.md`

규칙:
1. `v3`를 기반으로 `v4`를 만든다.
2. 기존 구조와 컴포넌트 분리를 최대한 유지한다.
3. `scroll_f.md`를 유일한 스크롤 구조 기준으로 삼는다.
4. 새 프레임워크나 불필요한 리팩터링은 하지 않는다.
5. 직접 파일을 수정하고, 변경 후 빌드로 검증한다.
6. 매 큰 변경 후 `npm run build`를 실행한다.
7. 내가 별도로 요청하지 않으면 구현을 멈추지 말고 끝까지 진행한다.

필수 구현:
- Scroll 1~12
- Intro
- Scroll 8 사례 카드 및 모달
- 필요한 이미지/영상 자산 연결
- 재사용 가능한 md 문서 생성

응답 방식:
- 시작 전 첫 작업만 짧게 알린다.
- 중간에는 진행 내용만 짧게 공유한다.
- 마지막에는 변경 파일, 검증 결과, 다음 단계만 간단히 정리한다.
```

## 3. Token-Minimized Prompt

사용 상황:
- 토큰을 가장 적게 쓰고 싶을 때
- 기준 문서와 검증 규칙만 강하게 고정하면 되는 경우

```text
`/Users/gonzalez/codex_위고비`에서 작업.

`v3`를 베이스로 `v4`를 만들고, 아래 문서를 유일한 기준으로 삼아 현재 v4 수준의 랜딩 페이지를 재현해라:
`/Users/gonzalez/.gemini/antigravity/brain/602bf2d9-d0b4-4c53-a5b2-a95bbcc17c9e/scroll_f.md`

조건:
- 기존 구조/phase 분리 유지
- Intro + Scroll 1~12 구현
- Scroll 8 사례 모달 포함
- 필요한 public asset 연결
- 재사용용 md 문서 생성
- 각 큰 변경 후 `npm run build` 검증
- 질문 최소화, 바로 구현 우선

마지막에는 핵심 변경, build 결과, 다음 추천만 짧게 정리.
```

## 추천 사용 순서

- 결과 품질이 가장 중요하면: `Design Work Prompt`
- 구현 효율이 가장 중요하면: `Coding Agent Prompt`
- 토큰 절약이 가장 중요하면: `Token-Minimized Prompt`

## 한 줄 요약

가장 중요한 고정값은 3개입니다.

- 베이스는 `v3`
- 기준 문서는 `scroll_f.md`
- 큰 변경 후 반드시 `npm run build`
