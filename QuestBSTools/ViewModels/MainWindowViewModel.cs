using QuestBSTools.Services;

namespace QuestBSTools.ViewModels;

public class MainWindowViewModel : ViewModelBase
{
    public LoadingViewModel LoadingView { get; }
    
    public UiService uiService { get; }
    
    public MainWindowViewModel(LoadingViewModel loadingView, UiService service)
    {
        LoadingView = loadingView;
        uiService = service;
    }
}