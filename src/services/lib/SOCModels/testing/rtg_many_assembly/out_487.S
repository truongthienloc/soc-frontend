.text

#The program checks the ALU instruction in I_type

Main:
		addi    x18 , x0 , -2048 
		addi    x1 , x0 , 108 
		sltu    x12 , x18 , x1 
		bltu    x18 , x1 , Less_i 
		bgeu    x18 , x1 , Bigger_i 
Less_i:
		ori     x21 , x18 , 35 
		sub     x2 , x1 , x18 
		srai    x2 , x2 , 3 
		and     x2 , x2 , x0 
		addi    x14 , x0 , 0 
		beq     x2 , x14 , Pass 
Bigger_i:
		ori     x21 , x18 , 63 
		sub     x2 , x1 , x18 
		srai    x2 , x2 , 1 
		and     x2 , x2 , x0 
		addi    x14 , x0 , 0 
		beq     x2 , x14 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
