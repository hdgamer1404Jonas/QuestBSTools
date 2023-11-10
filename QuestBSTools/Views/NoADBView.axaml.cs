using Avalonia;
using Avalonia.Controls;
using Avalonia.Markup.Xaml;

namespace QuestBSTools.Views;

public partial class NoADBView : UserControl
{
    public NoADBView()
    {
        InitializeComponent();
    }

    private void InitializeComponent()
    {
        AvaloniaXamlLoader.Load(this);
    }
}