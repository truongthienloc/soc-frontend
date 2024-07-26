.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x22 , 7 
		lui     x10 , 8 
		lui     x8 , 4 
		lui     x20 , 4 
		sw      x23 , 20 (x22) 
		sw      x2 , 24 (x10) 
		sw      x7 , 28 (x8) 
		sw      x5 , 32 (x20) 
		lw      x27 , 32 (x20) 
		lw      x11 , 28 (x8) 
		lw      x14 , 24 (x10) 
		lw      x25 , 20 (x22) 
		bne     x25 , x23 , Fail
		bne     x14 , x2 , Fail
		bne     x11 , x7 , Fail
		bne     x27 , x5 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
