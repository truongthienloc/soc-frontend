.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x23 , 9
		auipc    x6 , 1
		auipc    x4 , 8
		auipc    x17 , 3
		lui      x5 , 5
		lui      x30 , 4
		lui      x8 , 1
		lui      x1 , 2
		sw       x2 , 76 (x23) 
		sw       x29 , 80 (x6) 
		sw       x12 , 84 (x4) 
		sw       x9 , 88 (x17) 
		sw       x24 , 92 (x5) 
		sw       x7 , 96 (x30) 
		sw       x10 , 100 (x8) 
		sw       x18 , 104 (x1) 
		lw       x15 , 104 (x1) 
		lw       x25 , 100 (x8) 
		lw       x22 , 96 (x30) 
		lw       x26 , 92 (x5) 
		lw       x27 , 88 (x17) 
		lw       x11 , 84 (x4) 
		lw       x13 , 80 (x6) 
		lw       x21 , 76 (x23) 
		bne      x21 , x2 , Fail
		bne      x13 , x29 , Fail
		bne      x11 , x12 , Fail
		bne      x27 , x9 , Fail
		bne      x26 , x24 , Fail
		bne      x22 , x7 , Fail
		bne      x25 , x10 , Fail
		bne      x15 , x18 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
