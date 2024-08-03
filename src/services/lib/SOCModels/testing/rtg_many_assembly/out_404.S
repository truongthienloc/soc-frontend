.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x15 , x0 , 4 
		addi    x29 , x0 , 0 
		addi    x10 , x0 , 0 
		addi    x2 , x0 , 56 
InArr:
		addi    x27 , x0 , 4 
		addi    x24 , x0 , 0 
		addi    x31 , x0 , 24 
		addi    x6 , x0 , 4 
		sh      x27 , 28 (x2) 
		sh      x24 , 32 (x2) 
		sh      x31 , 36 (x2) 
		sh      x6 , 40 (x2) 
Loop:
		slli    x7 , x10 , 2 
		add     x9 , x7 , x2 
		lh      x13 , 28 (x9) 
		add     x29 , x29 , x13 
		addi    x10 , x10 , 1 
		beq     x10 , x15 , Result 
		jal     x0 , Loop 
Result:
		addi    x16 , x0 , 32 
		bne     x16 , x29 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
