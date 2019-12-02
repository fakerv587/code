reg delete HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\ /v DisableTaskMgr /f
reg delete "HKEY_CURRENT_USER\SOFTWARE\Microsoft\Terminal Server Client" /v "AuthenticationLevelOverride" /f
taskkill -f -im Vinzor.exe
taskkill -f -im VinzorSpiceClient.exe