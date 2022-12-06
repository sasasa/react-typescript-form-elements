import { useRef, useState, VFC } from "react";
import { UserShow } from "./UserShow";
import type { UserType } from "../types/UserType";

export const MyForm: VFC = () => {
  const file = useRef(null);
  // a. 入力 値 に 関わる 値 を State として 初期化
  const [fileName, setFileName] = useState<string>("");
  const [form, setForm] = useState<UserType>({
    name: "山田 太郎",
    email: "tyamada@example.com",
    memo: `React は 人気 の フレーム ワーク…`,
    fruit: "apple",
    fruit2: ["apple", "melon"],
    sex: "female",
    send: true,
    fruit3: ["apple", "melon"]
  });
  // c. 入力 ボックス の 変更 を State に 反映
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  function handleChangeList(e: React.ChangeEvent<HTMLSelectElement>) {
    // 選択 値 を 格納 する ため の 配列
    const data: Array<string> = [];
    // < option > 要素 を 順に 走査 し、 選択 さ れ た もの を 取得
    const opts = e.target.options;
    for (const opt of opts) {
      if (opt.selected) {
        data.push(opt.value);
      }
    }
    setForm({
      ...form,
      [e.target.name]: data
    });
  }
  function handleChangeCheck(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.checked
    });
  }
  function handleChangeMulti(e: React.ChangeEvent<HTMLInputElement>) {
    const fs = form.fruit3;
    // チェック 時 は 追加、 非 チェック 時 は 削除
    if (e.target.checked) {
      fs.push(e.target.value);
    } else {
      fs.splice(fs.indexOf(e.target.value), 1);
    }
    setForm({
      ...form,
      [e.target.name]: fs
    });
  }

  // d. ［送信］ ボタン で 入力 値 を ログ に 出力
  const show = () => {
    console.log(`name: ${form.name}`);
    console.log(`email: ${form.email}`);
    console.log(`memo: ${form.memo}`);
    console.log(`fruit: ${form.fruit}`);
    console.log(`fruit2: ${form.fruit2}`);
    console.log(`sex: ${form.sex}`);
    console.log(`send: ${form.send}`);
    console.log(`fruit3: ${form.fruit3}`);
    const f = file.current.files[0];
    setFileName(f?.name ?? "ファイルが選択されていません");
    console.log(`ファイル名：${fileName}`);
  };
  // フォーム を 描画
  return (
    <>
      <UserShow {...form} fileName={fileName} />
      <form>
        {/*b. State 値 を 個々 の フォーム 要素 に 反映*/}
        <div>
          <label htmlFor="name">名前：</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            value={form.name}
          />
        </div>
        <div>
          <label htmlFor="email">メールアドレス：</label>
          <input
            id="email"
            name="email"
            type="mail"
            onChange={handleChange}
            value={form.email}
          />
        </div>
        <div>
          <label htmlFor="memo">メモ：</label>
          <textarea
            id="memo"
            name="memo"
            rows={3}
            value={form.memo}
            onChange={handleTextChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="fruit">好きな果物：</label>
          <select
            id="fruit"
            name="fruit"
            value={form.fruit}
            onChange={handleSelectChange}
          >
            <option value="apple">リンゴ</option>
            <option value="orange">オレンジ</option>
            <option value="melon">メロン</option>
            <option value="grape">葡萄</option>
            <option value="strawberry">苺</option>
          </select>
        </div>
        <div>
          <label htmlFor="fruit2">好きな果物：</label>
          <select
            id="fruit2"
            name="fruit2"
            value={form.fruit2}
            size={5}
            multiple={true}
            onChange={handleChangeList}
          >
            <option value="apple">リンゴ</option>
            <option value="orange">オレンジ</option>
            <option value="melon">メロン</option>
            <option value="grape">葡萄</option>
            <option value="strawberry">苺</option>
          </select>
        </div>
        <div>
          <fieldset>
            <legend>性別：</legend>
            <label htmlFor="sex_male">男性</label>
            <input
              id="sex_male"
              name="sex"
              type="radio"
              value="male"
              checked={form.sex === "male"}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="sex_female">女性</label>
            <input
              id="sex_female"
              name="sex"
              type="radio"
              value="female"
              checked={form.sex === "female"}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="sex_other">その他</label>
            <input
              id="sex_other"
              name="sex"
              type="radio"
              value="other"
              checked={form.sex === "other"}
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div>
          <label htmlFor="send">メール 送付？：</label>
          <input
            id="send"
            name="send"
            type="checkbox"
            checked={form.send}
            onChange={handleChangeCheck}
          />
        </div>
        <div>
          <fieldset>
            <legend>好きな果物3：</legend>
            {/*c. チェック 状態 を 反映*/}
            <label htmlFor="fruit_apple3">リンゴ</label>
            <input
              id="fruit_apple3"
              name="fruit"
              type="checkbox"
              value="apple"
              checked={form.fruit3.includes("apple")}
              onChange={handleChangeMulti}
            />
            <br />
            <label htmlFor="fruit_orange3">オレンジ</label>
            <input
              id="fruit_orange3"
              name="fruit"
              type="checkbox"
              value="orange"
              checked={form.fruit3.includes("orange")}
              onChange={handleChangeMulti}
            />
            <br />
            <label htmlFor="fruit_melon3">メロン</label>
            <input
              id="fruit_melon3"
              name="fruit"
              type="checkbox"
              value="melon"
              checked={form.fruit3.includes("melon")}
              onChange={handleChangeMulti}
            />
            <br />
            <label htmlFor="fruit_grape3">葡萄</label>
            <input
              id="fruit_grape3"
              name="fruit"
              type="checkbox"
              value="grape"
              checked={form.fruit3.includes("grape")}
              onChange={handleChangeMulti}
            />
            <br />
            <label htmlFor="fruit_strawberry3">苺</label>
            <input
              id="fruit_strawberry3"
              name="fruit"
              type="checkbox"
              value="strawberry"
              checked={form.fruit3.includes("strawberry")}
              onChange={handleChangeMulti}
            />
          </fieldset>
        </div>
        <div>
          <input name="upfile" type="file" ref={file} />
        </div>
        <div>
          <button type="button" onClick={show}>
            送信
          </button>
        </div>
      </form>
    </>
  );
};
