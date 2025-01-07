.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Read and write a memory address multiple times

Main:
		lui     x20 , 6 
		lui     x23 , 4 
		lui     x2 , 8 
		lui     x14 , 7 
		sb      x24 , 60 (x20) 
		sb      x10 , 60 (x23) 
		sb      x13 , 60 (x2) 
		sb      x19 , 60 (x14) 
		lb      x3 , 60 (x14) 
		lb      x11 , 60 (x2) 
		lb      x17 , 60 (x23) 
		lb      x26 , 60 (x20) 
		bne     x26 , x24 , Fail
		bne     x17 , x10 , Fail
		bne     x11 , x13 , Fail
		bne     x3 , x19 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
