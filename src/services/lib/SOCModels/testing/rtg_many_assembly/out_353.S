.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x5 , 3
		auipc    x14 , 5
		auipc    x21 , 2
		auipc    x28 , 7
		lui      x1 , 9
		lui      x13 , 8
		lui      x12 , 2
		lui      x2 , 6
		sw       x6 , 80 (x5) 
		sw       x11 , 84 (x14) 
		sw       x7 , 88 (x21) 
		sw       x23 , 92 (x28) 
		sw       x4 , 96 (x1) 
		sw       x17 , 100 (x13) 
		sw       x31 , 104 (x12) 
		sw       x20 , 108 (x2) 
		lw       x29 , 108 (x2) 
		lw       x30 , 104 (x12) 
		lw       x27 , 100 (x13) 
		lw       x25 , 96 (x1) 
		lw       x16 , 92 (x28) 
		lw       x19 , 88 (x21) 
		lw       x3 , 84 (x14) 
		lw       x9 , 80 (x5) 
		bne      x9 , x6 , Fail
		bne      x3 , x11 , Fail
		bne      x19 , x7 , Fail
		bne      x16 , x23 , Fail
		bne      x25 , x4 , Fail
		bne      x27 , x17 , Fail
		bne      x30 , x31 , Fail
		bne      x29 , x20 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
