using System.ComponentModel;
using Core.Resources;

namespace Core;

public class StartupChecks
{
    private readonly string ADBExecutableName = OperatingSystem.IsWindows() ? "adb.exe" : "adb";
    
    public async Task<bool> CheckADB()
    {
        Console.Out.WriteLine("Checking ADB...");

        try
        {
            await ProcessUtilities.Invoke(ADBExecutableName, "--version");
            Console.Out.WriteLine("ADB found on path");
            return true;
        }
        catch (Win32Exception)
        {
            Console.Out.WriteLine("ADB not found on path");
            return false;
        }
    }
}