.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x25 , 0 
		lui     x7 , 8 
		lui     x29 , 3 
		lui     x23 , 7 
		sw      x12 , 104 (x25) 
		sw      x27 , 108 (x7) 
		sw      x17 , 112 (x29) 
		sw      x24 , 116 (x23) 
		lw      x9 , 116 (x23) 
		lw      x5 , 112 (x29) 
		lw      x11 , 108 (x7) 
		lw      x20 , 104 (x25) 
		bne     x20 , x12 , Fail
		bne     x11 , x27 , Fail
		bne     x5 , x17 , Fail
		bne     x9 , x24 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
