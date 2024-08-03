.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x21 , x0 , 4 
		add     x30 , x0 , x0 
		add     x25 , x0 , x0 
		addi    x8 , x0 , 28 
		addi    x1 , x0 , 2 
InArr:
		addi    x9 , x0 , 40 
		addi    x6 , x0 , 76 
		addi    x3 , x0 , 44 
		addi    x13 , x0 , 56 
		sh      x9 , 4 (x8) 
		sh      x6 , 8 (x8) 
		sh      x3 , 12 (x8) 
		sh      x13 , 16 (x8) 
Loop:
		sll     x26 , x25 , x1 
		add     x20 , x26 , x8 
		lhu     x31 , 4 (x20) 
		add     x30 , x30 , x31 
		addi    x25 , x25 , 1 
		beq     x25 , x21 , Result 
		jal     x0 , Loop 
Result:
		addi    x2 , x0 , 216 
		bne     x2 , x30 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
