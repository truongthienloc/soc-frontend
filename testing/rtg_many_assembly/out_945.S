.text

#The program checks the ALU instruction in I_type

Main:
		addi    x7 , x0 , -2048 
		addi    x26 , x0 , 100 
		sltu    x9 , x7 , x26 
		bltu    x7 , x26 , Less_i 
		bgeu    x7 , x26 , Bigger_i 
Less_i:
		ori     x21 , x7 , 85 
		sub     x4 , x26 , x7 
		srai    x4 , x4 , 2 
		and     x4 , x4 , x0 
		addi    x14 , x0 , 0 
		beq     x4 , x14 , Pass 
Bigger_i:
		ori     x21 , x7 , 28 
		sub     x4 , x26 , x7 
		srai    x4 , x4 , 0 
		and     x4 , x4 , x0 
		addi    x14 , x0 , 0 
		beq     x4 , x14 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
