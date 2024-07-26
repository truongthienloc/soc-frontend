.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Read and write a memory address multiple times

Main:
		lui     x11 , 1 
		lui     x5 , 7 
		lui     x16 , 8 
		lui     x8 , 8 
		sb      x17 , 92 (x11) 
		sb      x15 , 92 (x5) 
		sb      x7 , 92 (x16) 
		sb      x19 , 92 (x8) 
		lb      x24 , 92 (x8) 
		lb      x18 , 92 (x16) 
		lb      x3 , 92 (x5) 
		lb      x21 , 92 (x11) 
		bne     x21 , x17 , Fail
		bne     x3 , x15 , Fail
		bne     x18 , x7 , Fail
		bne     x24 , x19 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
