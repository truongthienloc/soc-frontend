.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x19 , 5 
		lui     x8 , 3 
		lui     x24 , 6 
		lui     x6 , 9 
		sw      x18 , 56 (x19) 
		sw      x4 , 60 (x8) 
		sw      x20 , 64 (x24) 
		sw      x28 , 68 (x6) 
		lw      x30 , 68 (x6) 
		lw      x13 , 64 (x24) 
		lw      x17 , 60 (x8) 
		lw      x23 , 56 (x19) 
		bne     x23 , x18 , Fail
		bne     x17 , x4 , Fail
		bne     x13 , x20 , Fail
		bne     x30 , x28 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
