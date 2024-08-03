.text

#The program checks the ALU instruction in I_type

Main:
		addi    x27 , x0 , 101 
		addi    x16 , x0 , -2048 
		slti    x31 , x27 , 46 
		bltu    x27 , x16 , Less_i 
		bgeu    x27 , x16 , Bigger_i 
Less_i:
		ori     x22 , x27 , 180 
		sub     x25 , x16 , x27 
		srai    x25 , x25 , 3 
		and     x25 , x25 , x0 
		addi    x4 , x0 , 0 
		beq     x25 , x4 , Pass 
Bigger_i:
		ori     x22 , x27 , 157 
		sub     x25 , x16 , x27 
		srai    x25 , x25 , 3 
		and     x25 , x25 , x0 
		addi    x4 , x0 , 0 
		beq     x25 , x4 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
