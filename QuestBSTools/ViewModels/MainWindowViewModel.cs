using QuestBSTools.Services;

namespace QuestBSTools.ViewModels;

public class MainWindowViewModel : ViewModelBase
{
    public LoadingViewModel LoadingView { get; }
    public NoADBViewModel NoADBView { get; }
    public LoadedViewModel LoadedView { get; }
    
    public UiService uiService { get; }
    
    public MainWindowViewModel(LoadingViewModel loadingView, NoADBViewModel noAdbView, LoadedViewModel loadedView, UiService service)
    {
        LoadingView = loadingView;
        NoADBView = noAdbView;
        uiService = service;
    }
}