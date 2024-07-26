.text

#The program checks the ALU instruction in I_type

Main:
		addi    x6 , x0 , 176 
		addi    x14 , x0 , -2048 
		slti    x24 , x6 , 494 
		bltu    x6 , x14 , Less_i 
		bgeu    x6 , x14 , Bigger_i 
Less_i:
		ori     x1 , x6 , 88 
		sub     x26 , x14 , x6 
		srai    x26 , x26 , 1 
		and     x26 , x26 , x0 
		addi    x8 , x0 , 0 
		beq     x26 , x8 , Pass 
Bigger_i:
		ori     x1 , x6 , 30 
		sub     x26 , x14 , x6 
		srai    x26 , x26 , 4 
		and     x26 , x26 , x0 
		addi    x8 , x0 , 0 
		beq     x26 , x8 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
