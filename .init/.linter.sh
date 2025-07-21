#!/bin/bash
cd /tmp/kavia/workspace/code-generation/tic-tac-toe-web-app-6b7ad58d/react_js_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

