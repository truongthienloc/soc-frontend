.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x16 , x0 , 4 
		addi    x8 , x0 , 0 
		addi    x25 , x0 , 0 
		addi    x14 , x0 , 52 
InArr:
		addi    x24 , x0 , 72 
		addi    x17 , x0 , 12 
		addi    x20 , x0 , 44 
		addi    x27 , x0 , 20 
		sh      x24 , 72 (x14) 
		sh      x17 , 76 (x14) 
		sh      x20 , 80 (x14) 
		sh      x27 , 84 (x14) 
Loop:
		slli    x31 , x25 , 2 
		add     x18 , x31 , x14 
		lh      x9 , 72 (x18) 
		add     x8 , x8 , x9 
		addi    x25 , x25 , 1 
		beq     x25 , x16 , Result 
		jal     x0 , Loop 
Result:
		addi    x6 , x0 , 148 
		bne     x6 , x8 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
