.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x9 , x0 , 4 
		addi    x25 , x0 , 0 
		addi    x21 , x0 , 0 
		addi    x5 , x0 , 24 
InArr:
		addi    x12 , x0 , 20 
		addi    x7 , x0 , 72 
		addi    x10 , x0 , 44 
		addi    x28 , x0 , 28 
		sh      x12 , 36 (x5) 
		sh      x7 , 40 (x5) 
		sh      x10 , 44 (x5) 
		sh      x28 , 48 (x5) 
Loop:
		slli    x24 , x21 , 2 
		add     x31 , x24 , x5 
		lh      x6 , 36 (x31) 
		add     x25 , x25 , x6 
		addi    x21 , x21 , 1 
		beq     x21 , x9 , Result 
		jal     x0 , Loop 
Result:
		addi    x4 , x0 , 164 
		bne     x4 , x25 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
