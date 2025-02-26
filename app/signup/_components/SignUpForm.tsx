"use client";

import { signup } from "@/actions/signUpAction";
import { SidebarContext } from "@/context/SidebarContext"; // SidebarContextをインポート
import { signupSchema } from "@/schemas/schema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState, useContext, useState } from "react";

export function SignUpForm() {
  const { isOpen } = useContext(SidebarContext); // Sidebarの状態を取得
  const [lastResult, action] = useActionState(signup, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signupSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [showPwd, setShowPwd] = useState(false);

  const togglePwd = () => {
    setShowPwd((prev) => !prev);
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center transition-all duration-300 ${
        isOpen ? "ml-60" : "ml-16"
      }`}
    >
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
        {/* 見出し */}
        <div className="text-center">
          <h1 className="font-bold text-2xl">新規登録</h1>
          <p className="mt-2 text-gray-600 text-sm">
            アカウントを作成して、より快適なトレーニング管理を体験しましょう。
          </p>
        </div>

        {/* ソーシャルログイン */}
        <div className="space-y-2">
          <button
            type="button"
            className="btn btn-outline btn-google flex w-full items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4"
            >
              <title>Google Icon</title>
              <path d="M8 0C3.582 0 0 3.582 0 8c0 4.418 3.582 8 8 8 4.418 0 8-3.582 8-8 0-.523-.047-1.033-.138-1.526H8v3.056h4.697a3.926 3.926 0 0 1-1.702 2.574V12h2.742A8.002 8.002 0 0 0 16 8c0-4.418-3.582-8-8-8z" />
            </svg>
            Googleで登録
          </button>
          <button
            type="button"
            className="btn btn-outline btn-twitter flex w-full items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4"
            >
              <title>Twitter Icon</title>
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.142 0-.283-.009-.425A6.696 6.696 0 0 0 16 3.542a6.59 6.59 0 0 1-1.885.516 3.293 3.293 0 0 0 1.444-1.816 6.588 6.588 0 0 1-2.084.797A3.281 3.281 0 0 0 7.88 7.125a9.32 9.32 0 0 1-6.768-3.429 3.283 3.283 0 0 0 1.018 4.382 3.27 3.27 0 0 1-1.487-.409v.041a3.284 3.284 0 0 0 2.633 3.218 3.288 3.288 0 0 1-1.482.057 3.285 3.285 0 0 0 3.067 2.279A6.588 6.588 0 0 1 1 13.557a9.313 9.313 0 0 0 5.026 1.47" />
            </svg>
            Twitterで登録
          </button>
        </div>

        {/* 区切り線 */}
        <div className="divider">または</div>

        {/* 通常ログインフォーム */}
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <div className="space-y-4">
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="email"
                  key={fields.email.key}
                  name={fields.email.name}
                  defaultValue={fields.email.initialValue}
                  className="grow"
                  placeholder="メールアドレス"
                />
              </label>
              <div className="text-red-500 text-sm">{fields.email.errors}</div>
            </div>
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type={showPwd ? "text" : "password"}
                  key={fields.password.key}
                  name={fields.password.name}
                  defaultValue={fields.password.initialValue}
                  className="grow"
                  placeholder="パスワード(英数字8文字以上)"
                />
                <button
                  type="button"
                  onClick={togglePwd}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {/* Toggleアイコン */}
                  {showPwd ? "👁️" : "🙈"}
                </button>
              </label>
              <div className="text-red-500 text-sm">
                {fields.password.errors}
              </div>
            </div>
          </div>

          {/* ボタン */}
          <button type="submit" className="btn btn-primary mt-4 w-full">
            登録
          </button>
        </form>
      </div>
    </div>
  );
}
