#!/bin/bash

# shellcheck disable=SC2235
if [ "$CI_PIPELINE_SOURCE" == "push" ] && ( [ "$CI_COMMIT_BRANCH" == "dev" ] || [ "$CI_COMMIT_BRANCH" == "main" ] ); then
  MESSAGE="<b>$CI_PROJECT_NAME</b>\n\nStage: $CI_JOB_STAGE\nJob Status: "

  # Check the status of the current CI job
  if [ "$CI_JOB_STATUS" == "success" ]; then
    MESSAGE+="✅"
  elif [ "$CI_JOB_STATUS" == "failed" ]; then
    MESSAGE+="❌"
  elif [ "$CI_JOB_STATUS" == "canceled" ]; then
    MESSAGE+="🚫"
  fi

  declare current_telegram_user_var_name=TELEGRAM_USER_ID_$GITLAB_USER_LOGIN
  MESSAGE+="\nUrl: <code>$CI_PROJECT_URL</code>\n"
  MESSAGE+="Branch: $CI_COMMIT_BRANCH\n"
  MESSAGE+="User: <a href='tg://user?id=${!current_telegram_user_var_name}'>$GITLAB_USER_LOGIN</a>\n"
  MESSAGE+="Commit: <code>$CI_COMMIT_TITLE</code>"
  MESSAGE+="\n#$CI_COMMIT_BRANCH #ID$CI_PROJECT_ID"
  # Send message to Telegram only if the job status is success, failed, or canceled
  if [ "$CI_JOB_STATUS" == "success" ] || [ "$CI_JOB_STATUS" == "failed" ] || [ "$CI_JOB_STATUS" == "canceled" ]; then
    curl -s -X POST \
      --url "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
      --header "Content-Type: application/json" \
      --data "{\"chat_id\": \"$TELEGRAM_CHAT_ID\", \"text\": \"$MESSAGE\",\"message_thread_id\": \"$TELEGRAM_MESSAGE_THREAD_ID\", \"disable_web_page_preview\": true, \"disable_notification\": true, \"parse_mode\": \"html\"}"
  fi
fi
