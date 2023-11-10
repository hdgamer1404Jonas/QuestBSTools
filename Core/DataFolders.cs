using System;
using System.IO;

namespace Core;

public class DataFolders
{
    public string ConfigFolder { get; }
    public string DataFolder { get; }
    public string LogFolder { get; }
    
    public DataFolders()
    {
        string appDataFolder = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData, Environment.SpecialFolderOption.Create);
        ConfigFolder = Path.Combine(appDataFolder, "QuestBSTools");
        Directory.CreateDirectory(ConfigFolder);
        DataFolder = Path.Combine(ConfigFolder, "Data");
        Directory.CreateDirectory(DataFolder);
        LogFolder = Path.Combine(ConfigFolder, "Logs");
        Directory.CreateDirectory(LogFolder);
    }
}