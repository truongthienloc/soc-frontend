.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Read and write a memory address multiple times

Main:
		lui     x19 , 4 
		lui     x15 , 4 
		lui     x2 , 0 
		lui     x22 , 7 
		sb      x28 , 76 (x19) 
		sb      x17 , 76 (x15) 
		sb      x20 , 76 (x2) 
		sb      x5 , 76 (x22) 
		lb      x27 , 76 (x22) 
		lb      x26 , 76 (x2) 
		lb      x6 , 76 (x15) 
		lb      x16 , 76 (x19) 
		bne     x16 , x28 , Fail
		bne     x6 , x17 , Fail
		bne     x26 , x20 , Fail
		bne     x27 , x5 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
