//
//  SafariExtensionViewController.swift
//  NetflixMuteSafari Extension
//
//  Created by dePaul Miller on 1/10/19.
//  Copyright © 2019 dePaul Miller. All rights reserved.
//

import SafariServices

class SafariExtensionViewController: SFSafariExtensionViewController {
    
    static let shared: SafariExtensionViewController = {
        let shared = SafariExtensionViewController()
        shared.preferredContentSize = NSSize(width:320, height:240)
        return shared
    }()

}
