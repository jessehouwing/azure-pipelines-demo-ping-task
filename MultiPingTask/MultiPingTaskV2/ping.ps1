$remotehost = Get-VstsInput -Name "RemoteHost"
[string] $output = (ping $remotehost)

if ($output -match "Pinging")
{
    if ($output -match "100\% loss")
    {
        Write-VstsTaskError "Could not reach $remotehost"
        Write-VstsSetResult -Result "Failed"
    }
    elseif ($output -match "0\% loss")
    {
        Write-VstsSetResult -Result "Succeeded"
    }
    else
    {
        Write-VstsSetResult -Result "SucceededWithIssues"
    }
}
else
{
    Write-VstsTaskError "$output"
    Write-VstsSetResult -Result "Failed"
}