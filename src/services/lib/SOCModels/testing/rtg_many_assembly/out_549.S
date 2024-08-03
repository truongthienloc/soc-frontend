.text

#The program checks the ALU instruction in I_type

Main:
		addi    x6 , x0 , 179 
		addi    x18 , x0 , -2048 
		slti    x14 , x6 , 711 
		bltu    x6 , x18 , Less_i 
		bgeu    x6 , x18 , Bigger_i 
Less_i:
		ori     x29 , x6 , 5 
		sub     x1 , x18 , x6 
		srai    x1 , x1 , 3 
		and     x1 , x1 , x0 
		addi    x30 , x0 , 0 
		beq     x1 , x30 , Pass 
Bigger_i:
		ori     x29 , x6 , 94 
		sub     x1 , x18 , x6 
		srai    x1 , x1 , 4 
		and     x1 , x1 , x0 
		addi    x30 , x0 , 0 
		beq     x1 , x30 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
