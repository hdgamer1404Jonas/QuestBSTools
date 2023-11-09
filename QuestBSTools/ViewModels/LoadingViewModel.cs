using System.Threading.Tasks;
using QuestBSTools.Services;

namespace QuestBSTools.ViewModels;



public class LoadingViewModel : ViewModelBase
{
    public UiService uiService { get; }
    public string Status { get; set; } = "eee";

    public LoadingViewModel(UiService service)
    {
        uiService = service;
    }

}