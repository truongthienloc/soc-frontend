.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x10 , x0 , 4 
		add     x14 , x0 , x0 
		add     x26 , x0 , x0 
		addi    x18 , x0 , 44 
		addi    x24 , x0 , 2 
InArr:
		addi    x3 , x0 , 64 
		addi    x4 , x0 , 52 
		addi    x5 , x0 , 48 
		addi    x23 , x0 , 16 
		sh      x3 , 20 (x18) 
		sh      x4 , 24 (x18) 
		sh      x5 , 28 (x18) 
		sh      x23 , 32 (x18) 
Loop:
		sll     x12 , x26 , x24 
		add     x6 , x12 , x18 
		lhu     x25 , 20 (x6) 
		add     x14 , x14 , x25 
		addi    x26 , x26 , 1 
		beq     x26 , x10 , Result 
		jal     x0 , Loop 
Result:
		addi    x19 , x0 , 180 
		bne     x19 , x14 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
