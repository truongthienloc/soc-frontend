.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x19 , x0 , 4 
		addi    x18 , x0 , 0 
		addi    x31 , x0 , 0 
		addi    x29 , x0 , 72 
InArr:
		addi    x16 , x0 , 40 
		addi    x8 , x0 , 52 
		addi    x24 , x0 , 4 
		addi    x28 , x0 , 16 
		sh      x16 , 12 (x29) 
		sh      x8 , 16 (x29) 
		sh      x24 , 20 (x29) 
		sh      x28 , 24 (x29) 
Loop:
		slli    x20 , x31 , 2 
		add     x5 , x20 , x29 
		lh      x6 , 12 (x5) 
		add     x18 , x18 , x6 
		addi    x31 , x31 , 1 
		beq     x31 , x19 , Result 
		jal     x0 , Loop 
Result:
		addi    x3 , x0 , 112 
		bne     x3 , x18 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
