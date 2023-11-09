using System.ComponentModel;
using QuestBSTools.Kern.Resources;
using Serilog;

namespace QuestBSTools.Kern;

public class StartupChecks
{
    private readonly string ADBExecutableName = OperatingSystem.IsWindows() ? "adb.exe" : "adb";
    
    public async Task<bool> CheckADB()
    {
        Log.Information("Checking for ADB...");

        try
        {
            await ProcessUtilities.Invoke(ADBExecutableName, "-version");
            Log.Information("ADB found on path!");
            return true;
        }
        catch (Win32Exception)
        {
            Log.Information("ADB not found on path, prompting User...");
            return false;
        }
    }
}