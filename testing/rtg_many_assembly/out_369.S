.text

#The program checks the ALU instruction in I_type

Main:
		addi    x12 , x0 , -2048 
		addi    x18 , x0 , 139 
		sltu    x26 , x12 , x18 
		bltu    x12 , x18 , Less_i 
		bgeu    x12 , x18 , Bigger_i 
Less_i:
		ori     x25 , x12 , 179 
		sub     x2 , x18 , x12 
		srai    x2 , x2 , 3 
		and     x2 , x2 , x0 
		addi    x8 , x0 , 0 
		beq     x2 , x8 , Pass 
Bigger_i:
		ori     x25 , x12 , 79 
		sub     x2 , x18 , x12 
		srai    x2 , x2 , 2 
		and     x2 , x2 , x0 
		addi    x8 , x0 , 0 
		beq     x2 , x8 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
