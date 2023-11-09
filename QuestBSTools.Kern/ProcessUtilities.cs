using System.Diagnostics;
using System.Text;

namespace QuestBSTools.Kern.Resources;

public struct Output
{
    public string StandardOutput { get; set; }
    public string ErrorOutput { get; set; }
    public string CombinedOutput => StandardOutput + ErrorOutput;
    public int ExitCode { get; set; }
}

public class ProcessUtilities
{
    public static async Task<Output> Invoke(string filename, string arguments)
    {
        Process process = new();
        
        var startInfo = process.StartInfo;
        startInfo.FileName = filename;
        startInfo.Arguments = arguments;
        startInfo.RedirectStandardOutput = true;
        startInfo.RedirectStandardError = true;
        startInfo.UseShellExecute = false;
        startInfo.CreateNoWindow = true;
        
        process.EnableRaisingEvents = true;
        
        
        StringBuilder standardOutputBuilder = new();
        StringBuilder errorOutputBuilder = new();
        
        process.OutputDataReceived += (sender, args) =>
        {
            if (args.Data != null)
            {
                standardOutputBuilder.AppendLine(args.Data);
            }
        };
        
        process.ErrorDataReceived += (sender, args) =>
        {
            if (args.Data != null)
            {
                errorOutputBuilder.AppendLine(args.Data);
            }
        };
        
        process.Start();
        process.BeginOutputReadLine();
        process.BeginErrorReadLine();
        
        await process.WaitForExitAsync();
        
        return new Output
        {
            StandardOutput = standardOutputBuilder.ToString(),
            ErrorOutput = errorOutputBuilder.ToString(),
            ExitCode = process.ExitCode
        };
    }
}