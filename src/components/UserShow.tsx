import { VFC } from "react";
import type { UserType } from "../types/UserType";

type Prop = UserType & {
  fileName: string;
};

export const UserShow: VFC<Prop> = (props) => {
  const {
    name,
    email,
    memo,
    fruit,
    fruit2,
    sex,
    send,
    fruit3,
    fileName
  } = props;
  return (
    <dl>
      <dt>名前</dt>
      <dd>{name}</dd>
      <dt>メールアドレス</dt>
      <dd>{email}</dd>
      <dt>メモ</dt>
      <dd>{memo}</dd>
      <dt>果物</dt>
      <dd>{fruit}</dd>
      <dt>果物2</dt>
      <dd>{fruit2.join(" / ")}</dd>
      <dt>性別</dt>
      <dd>{sex}</dd>
      <dt>送信</dt>
      <dd>{send}</dd>
      <dt>果物3</dt>
      <dd>{fruit3.join(" / ")}</dd>
      <dt>ファイル名</dt>
      <dd>{fileName}</dd>
    </dl>
  );
};
