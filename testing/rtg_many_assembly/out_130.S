.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x24 , x0 , 4 
		addi    x3 , x0 , 0 
		addi    x23 , x0 , 0 
		addi    x20 , x0 , 8 
InArr:
		addi    x12 , x0 , 52 
		addi    x28 , x0 , 40 
		addi    x16 , x0 , 12 
		addi    x8 , x0 , 8 
		sh      x12 , 20 (x20) 
		sh      x28 , 24 (x20) 
		sh      x16 , 28 (x20) 
		sh      x8 , 32 (x20) 
Loop:
		slli    x5 , x23 , 2 
		add     x21 , x5 , x20 
		lh      x17 , 20 (x21) 
		add     x3 , x3 , x17 
		addi    x23 , x23 , 1 
		beq     x23 , x24 , Result 
		jal     x0 , Loop 
Result:
		addi    x22 , x0 , 112 
		bne     x22 , x3 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
