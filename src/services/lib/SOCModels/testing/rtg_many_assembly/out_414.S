.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x18 , 1 
		lui     x11 , 7 
		lui     x9 , 2 
		lui     x14 , 5 
		sw      x7 , 104 (x18) 
		sw      x28 , 108 (x11) 
		sw      x29 , 112 (x9) 
		sw      x27 , 116 (x14) 
		lw      x17 , 116 (x14) 
		lw      x10 , 112 (x9) 
		lw      x4 , 108 (x11) 
		lw      x15 , 104 (x18) 
		bne     x15 , x7 , Fail
		bne     x4 , x28 , Fail
		bne     x10 , x29 , Fail
		bne     x17 , x27 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
