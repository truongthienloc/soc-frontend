.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x29 , x0 , 4 
		addi    x6 , x0 , 0 
		addi    x17 , x0 , 0 
		addi    x4 , x0 , 20 
InArr:
		addi    x27 , x0 , 48 
		addi    x5 , x0 , 16 
		addi    x12 , x0 , 4 
		addi    x11 , x0 , 72 
		sh      x27 , 32 (x4) 
		sh      x5 , 36 (x4) 
		sh      x12 , 40 (x4) 
		sh      x11 , 44 (x4) 
Loop:
		slli    x3 , x17 , 2 
		add     x24 , x3 , x4 
		lh      x21 , 32 (x24) 
		add     x6 , x6 , x21 
		addi    x17 , x17 , 1 
		beq     x17 , x29 , Result 
		jal     x0 , Loop 
Result:
		addi    x23 , x0 , 140 
		bne     x23 , x6 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
